import { ArrowRightStartOnRectangleIcon, CheckIcon, ClipboardDocumentCheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Card } from "../components/Card";
import { Button, dbSelect, formatDate, Input, Modal, runCode, Select, Textarea, Tooltip } from "tamnora-react";
import { useState, useEffect } from "react";
import { DarkModeBtn } from "../components/DarkModeBtn";
import { useAuth } from "../utils/auth";
import { ResumenChecklistModal } from "../components/ResumenChecklistModal";

import {
  estadoCubiertasOptions,
  nivelesOptions,
  parabrisasOptions,
  espejosVentanasOptions,
  extintorPrecintoOptions,
  extintorCargaOptions,
  extintorFechaVencimientoOptions,
  documentosOptions,
  amortiguadoresFrenosOptions,
  estadoGeneralOptions,
  tableroTapizadosOptions,
  direccionOptions
} from "../utils/valores"
import { ResumenChecklist } from "../components/ResumenChecklist";

const initialFormData = {
  datosGenerales: {
    kilometraje: '',
  },
  estadoCubiertas: {
    delanteraIzquierda: 3,
    delanteraDerecha: 3,
    traseraIzquierda: 3,
    traseraDerecha: 3,
    ruedaAuxilio: 3,
    observacion: ''
  },
  niveles: {
    aceite: 3,
    agua: 3,
    frenos: 3,
    observacion: '',
  },
  vidrios: {
    parabrisas: 3,
    espejosLaterales: 3,
    ventanas: 3,
    observacion: '',
  },
  extintor: {
    precinto: 2,
    carga: 2,
    fechaVencimiento: 1,
    observacion: '',
  },
  documentos: {
    vtv: 2,
    poliza: 2,
    carnet: 2,
    manejoDefensivo: 2,
    tarjetaVerde: 2,
    observacion: '',
  },
  frenosDireccion: {
    amortiguadores: 3,
    frenos: 3,
    direccion: 2,
    observacion: '',
  },
  limpieza: {
    estadoGeneral: 2,
    tablero: 3,
    tapizados: 3,
    observacion: '',
  }
};

export function Home() {
  const [vehiculos, setVehiculos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [subtitle, setSubtitle] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [vehiculoSelected, setVehiculoSelected] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [users, setUsers] = useState({})
  const [checklistData, setChecklistData] = useState(null);
  const [formData, setFormData] = useState(initialFormData); // Inicializa formData

  const { logout, user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    const queryVehiculos = `
      SELECT v.*
      FROM vehiculos v
      JOIN empleados_vehiculos ev ON v.id = ev.vehiculo_id
      JOIN usuarios u ON ev.empleado_id = u.id
      WHERE u.id = ${user.id};
    `;

    const queryChecklists = `
      SELECT c.*, v.marca, v.modelo
      FROM checklists c
      JOIN vehiculos v ON c.vehiculo_id = v.id
      JOIN empleados_vehiculos ev ON v.id = ev.vehiculo_id
      JOIN usuarios u ON ev.empleado_id = u.id
      WHERE u.id = ${user.id} ORDER BY c.fecha DESC;
    `
    await runCode('-st usuarios').then(res => {
      let obj = {}
      res.forEach(user => {
        obj[user.id] = user.nombre_usuario
      })
      setUsers(obj)
    })

    await dbSelect('s', queryVehiculos)
      .then(res => {
        setVehiculos(res)
      })
      .catch(err => {
        console.error("Error fetching data: ", err);
      });

    await dbSelect('s', queryChecklists)
      .then(res => {
        setHistorial(res)
      })
      .catch(err => {
        console.error("Error fetching data: ", err);
      });

  };

  useEffect(() => {
    getData();
  }, [isModalOpen]);

  function isSameWeek(dateToCompare) {
    const today = new Date();
    const currentWeek = getWeek(today);
    const compareWeek = getWeek(dateToCompare);
    return currentWeek === compareWeek;
  }

  function getWeek(date) {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() - ((dateCopy.getDay() + 6) % 7));
    const firstDayOfYear = new Date(dateCopy.getFullYear(), 0, 1);
    const difference = dateCopy.getTime() - firstDayOfYear.getTime();
    const days = Math.round(difference / (1000 * 60 * 60 * 24));
    const weekNumber = Math.ceil((days + firstDayOfYear.getDay()) / 7);
    return weekNumber;
  }


  const handleChange = (section, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      }
    }));
  };

  function enviarChecklist() {
    const sql = `
      INSERT INTO checklists (
        fecha, 
        usuario_id, 
        vehiculo_id, 
        kilometraje, 
        estado_cubierta_delantera_izquierda, 
        estado_cubierta_delantera_derecha, 
        estado_cubierta_trasera_izquierda, 
        estado_cubierta_trasera_derecha, 
        estado_cubierta_auxilio, 
        observacion_cubiertas,
        nivel_aceite, 
        nivel_agua, 
        nivel_frenos, 
        observacion_niveles, 
        estado_parabrisas, 
        estado_espejos_laterales, 
        estado_ventanas, 
        observacion_vidrios, 
        extintor_precinto, 
        extintor_carga, 
        extintor_fecha_vencimiento, 
        observacion_extintor, 
        vtv, 
        poliza, 
        tarjeta_verde, 
        observacion_documentos, 
        estado_amortiguadores, 
        estado_frenos_direccion, 
        estado_direccion, 
        observacion_frenos_direccion, 
        estado_general_limpieza, 
        estado_tablero, 
        estado_tapizados, 
        observacion_limpieza
      ) VALUES (
        '${formatDate(new Date()).fecha}', 
        ${user.id}, 
        ${vehiculoSelected.id}, 
        ${formData.datosGenerales.kilometraje}, 
        ${formData.estadoCubiertas.delanteraIzquierda}, 
        ${formData.estadoCubiertas.delanteraDerecha}, 
        ${formData.estadoCubiertas.traseraIzquierda}, 
        ${formData.estadoCubiertas.traseraDerecha}, 
        ${formData.estadoCubiertas.ruedaAuxilio}, 
        '${formData.estadoCubiertas.observacion}', 
        ${formData.niveles.aceite}, 
        ${formData.niveles.agua}, 
        ${formData.niveles.frenos}, 
        '${formData.niveles.observacion}', 
        ${formData.vidrios.parabrisas}, 
        ${formData.vidrios.espejosLaterales}, 
        ${formData.vidrios.ventanas}, 
        '${formData.vidrios.observacion}', 
        ${formData.extintor.precinto}, 
        ${formData.extintor.carga}, 
        ${formData.extintor.fechaVencimiento}, 
        '${formData.extintor.observacion}', 
        ${formData.documentos.vtv}, 
        ${formData.documentos.poliza}, 
        ${formData.documentos.tarjetaVerde}, 
        '${formData.documentos.observacion}', 
        ${formData.frenosDireccion.amortiguadores}, 
        ${formData.frenosDireccion.frenos}, 
        ${formData.frenosDireccion.direccion}, 
        '${formData.frenosDireccion.observacion}', 
        ${formData.limpieza.estadoGeneral}, 
        ${formData.limpieza.tablero}, 
        ${formData.limpieza.tapizados}, 
        '${formData.limpieza.observacion}'
      );
    `;

    dbSelect('i', sql).then(res => console.log(res))
    closeModal()
  }

  // Define una función para cerrar el modal y resetear formData y step
  function closeModal() {
    setFormData(initialFormData); // Resetea formData al inicial
    setStep(1);
    setIsModalOpen(false);
    setIsModal2Open(false);
  }

  // Define una función para renderizar el formulario de cada paso
  function renderForm() {
    if (step === 1) {
      return (
        <section className="min-h-[144px]">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input isReadOnly label="Patente" defaultValue={vehiculoSelected.patente} variant="faded" />
            <Input isReadOnly label="Fecha" defaultValue={formatDate(new Date(), '/').fechaEs} variant="faded" />
          </div>
          <div className="grid grid-cols-1 gap-3 mt-3">
            <Input
              type="number"
              value={formData.datosGenerales.kilometraje}
              onChange={(e) => handleChange('datosGenerales', 'kilometraje', e.target.value)}
              variant="faded"
              label="Kilometraje"
              placeholder="Ingresar km del vehiculo"
              isRequired
            />
          </div>
        </section>
      );
    }

    if (step === 2) {
      return (
        <section className="min-h-[144px]">
          <div className="grid sm:grid-cols-2 gap-3">
            <Select
              defaultValue={formData.estadoCubiertas.delanteraIzquierda}
              onChange={(e) => handleChange('estadoCubiertas', 'delanteraIzquierda', e)}
              variant="faded"
              label="Delantera izquierda"
              options={estadoCubiertasOptions}
            />
            <Select
              defaultValue={formData.estadoCubiertas.delanteraDerecha}
              onChange={(e) => handleChange('estadoCubiertas', 'delanteraDerecha', e)}
              variant="faded"
              label="Delantera derecha"
              options={estadoCubiertasOptions} />
            <Select
              defaultValue={formData.estadoCubiertas.traseraIzquierda}
              onChange={(e) => handleChange('estadoCubiertas', 'traseraIzquierda', e)}
              variant="faded"
              label="Trasera izquierda"
              options={estadoCubiertasOptions} />
            <Select
              defaultValue={formData.estadoCubiertas.traseraDerecha}
              onChange={(e) => handleChange('estadoCubiertas', 'traseraDerecha', e)}
              variant="faded"
              label="Trasera derecha"
              options={estadoCubiertasOptions} />
          </div>
          <div className="grid gap-3 mt-3">
            <Select
              defaultValue={3}
              onChange={(e) => handleChange('estadoCubiertas', 'ruedaAuxilio', e)}
              variant="faded"
              label="Rueda de auxilio"
              options={estadoCubiertasOptions} />
            <Textarea
              variant="faded"
              label="Observaciones"
              onChange={(e) => handleChange('estadoCubiertas', 'observacion', e.target.value)}
              placeholder="Ingresar detalles extra de las cubiertas en caso de ser necesario." />
          </div>
        </section>
      );
    }

    if (step === 3) {
      return (
        <section className="min-h-[144px]">
          <div className="grid sm:grid-cols-3 gap-3">
            <Select
              defaultValue={formData.niveles.aceite}
              onChange={(e) => handleChange('niveles', 'aceite', e)}
              variant="faded"
              label="Nivel de Aceite"
              options={nivelesOptions} />
            <Select
              defaultValue={formData.niveles.agua}
              onChange={(e) => handleChange('niveles', 'agua', e)}
              variant="faded"
              label="Nivel de Agua"
              options={nivelesOptions} />
            <Select
              defaultValue={formData.niveles.frenos}
              onChange={(e) => handleChange('niveles', 'frenos', e)}
              variant="faded"
              label="Nivel de Líquido de Frenos"
              options={nivelesOptions} />
          </div>
          <div className="grid gap-3 mt-3">
            <Textarea
              defaultValue={formData.niveles.observacion}
              onChange={(e) => handleChange('niveles', 'observacion', e.target.value)}
              variant="faded"
              label="Observaciones"
              placeholder="Ingresar detalles en caso de ser necesario." />
          </div>
        </section>
      );
    }

    if (step === 4) {
      return (
        <section className="min-h-[144px]">
          <div className="grid sm:grid-cols-2 gap-3">
            <Select
              defaultValue={formData.vidrios.parabrisas}
              onChange={(e) => handleChange('vidrios', 'parabrisas', e)}
              variant="faded"
              label="Parabrisas"
              options={parabrisasOptions} />
            <Select
              defaultValue={formData.vidrios.espejosLaterales}
              onChange={(e) => handleChange('vidrios', 'espejosLaterales', e)}
              variant="faded"
              label="Espejos Laterales"
              options={espejosVentanasOptions} />
          </div>
          <div className="grid gap-3 mt-3">
            <Select
              defaultValue={formData.vidrios.ventanas}
              onChange={(e) => handleChange('vidrios', 'ventanas', e)}
              variant="faded"
              label="Ventanas"
              options={espejosVentanasOptions} />
            <Textarea
              defaultValue={formData.vidrios.observacion}
              onChange={(e) => handleChange('vidrios', 'observacion', e.target.value)}
              variant="faded"
              label="Observaciones"
              placeholder="Ingresar detalles en caso de ser necesario." />
          </div>
        </section>
      );
    }

    if (step === 5) {
      return (
        <section className="min-h-[144px] grid sm:grid-cols-3 gap-3">

          <Select
            defaultValue={formData.extintor.carga}
            onChange={(e) => handleChange('extintor', 'carga', e)}
            variant="faded"
            label="Carga"
            options={extintorCargaOptions} />
          <Select
            defaultValue={formData.extintor.precinto}
            onChange={(e) => handleChange('extintor', 'precinto', e)}
            variant="faded"
            label="Precinto"
            options={extintorPrecintoOptions} />
          <Select
            defaultValue={formData.extintor.fechaVencimiento}
            onChange={(e) => handleChange('extintor', 'fechaVencimiento', e)}
            variant="faded"
            label="Fecha de Vencimiento"
            options={extintorFechaVencimientoOptions} />

          <div className="sm:col-span-3">
            <Textarea
              defaultValue={formData.extintor.observacion}
              onChange={(e) => handleChange('extintor', 'observacion', e.target.value)}
              variant="faded"
              label="Observaciones"
              placeholder="Ingresar detalles en caso de ser necesario." />
          </div>
        </section>
      );
    }

    if (step === 6) {
      return (
        <section className="min-h-[144px]">
          <div className="grid sm:grid-cols-3 gap-3">
            <Select
              defaultValue={formData.documentos.vtv}
              onChange={(e) => handleChange('documentos', 'vtv', e)}
              variant="faded"
              label="VTV" options={documentosOptions} />
            <Select
              defaultValue={formData.documentos.poliza}
              onChange={(e) => handleChange('documentos', 'poliza', e)}
              variant="faded"
              label="Póliza de Seguro" options={documentosOptions} />
            <Select
              defaultValue={formData.documentos.tarjetaVerde}
              onChange={(e) => handleChange('documentos', 'tarjetaVerde', e)}
              variant="faded"
              label="Tarjeta Verde" options={documentosOptions} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <Select
              defaultValue={formData.documentos.carnet}
              onChange={(e) => handleChange('documentos', 'carnet', e)}
              variant="faded"
              label="Carnet de Conducir" options={documentosOptions} />
            <Select
              defaultValue={formData.documentos.manejoDefensivo}
              onChange={(e) => handleChange('documentos', 'manejoDefensivo', e)}
              variant="faded"
              label="Manejo Defensivo" options={documentosOptions} />
          </div>
          <div className="mt-3">
            <Textarea
              defaultValue={formData.documentos.observacion}
              onChange={(e) => handleChange('documentos', 'observacion', e.target.value)}
              variant="faded"
              label="Observaciones"
              placeholder="Ingresar detalles en caso de ser necesario." />
          </div>
        </section>
      );
    }

    if (step === 7) {
      return (
        <section className="min-h-[144px]">
          <div className="grid sm:grid-cols-2 gap-3">
            <Select
              defaultValue={formData.frenosDireccion.amortiguadores}
              onChange={(e) => handleChange('frenosDireccion', 'amortiguadores', e)}
              variant="faded"
              label="Amortiguadores"
              options={amortiguadoresFrenosOptions} />
            <Select
              defaultValue={formData.frenosDireccion.frenos}
              onChange={(e) => handleChange('frenosDireccion', 'frenos', e)}
              variant="faded"
              label="Frenos"
              options={amortiguadoresFrenosOptions} />
          </div>
          <div className="grid gap-3 mt-3">
            <Select
              defaultValue={formData.frenosDireccion.direccion}
              onChange={(e) => handleChange('frenosDireccion', 'direccion', e)}
              variant="faded"
              label="Dirección"
              options={direccionOptions} />
            <Textarea
              defaultValue={formData.frenosDireccion.observacion}
              onChange={(e) => handleChange('frenosDireccion', 'observacion', e.target.value)}
              variant="faded"
              label="Observaciones"
              placeholder="Ingresar detalles en caso de ser necesario." />
          </div>
        </section>
      );
    }

    if (step === 8) {
      return (
        <section className="min-h-[144px]">
          <div className="grid sm:grid-cols-2 gap-3">
            <Select
              defaultValue={formData.limpieza.estadoGeneral}
              onChange={(e) => handleChange('limpieza', 'estadoGeneral', e)}
              variant="faded"
              label="Estado General"
              options={estadoGeneralOptions} />
            <Select
              defaultValue={formData.limpieza.tablero}
              onChange={(e) => handleChange('limpieza', 'tablero', e)}
              variant="faded"
              label="Tablero de Instrumentos"
              options={tableroTapizadosOptions} />
          </div>
          <div className="grid gap-3 mt-3">
            <Select
              defaultValue={formData.limpieza.tapizados}
              onChange={(e) => handleChange('limpieza', 'tapizados', e)}
              variant="faded"
              label="Tapizados"
              options={tableroTapizadosOptions} />
            <Textarea
              defaultValue={formData.limpieza.observacion}
              onChange={(e) => handleChange('limpieza', 'observacion', e.target.value)}
              variant="faded"
              label="Observaciones"
              placeholder="Ingresar detalles en caso de ser necesario." />
          </div>
        </section>
      );
    }

    if (step === 9) {
      return (
        <div className="max-h-dvh sm:max-h-80 overflow-y-auto grid">
          <ResumenChecklistModal formData={formData} />
        </div>
      );
    }
  }

  // Define una función para actualizar el subtítulo del modal
  useEffect(() => {
    const subtitles = {
      1: 'Información general',
      2: 'Estado de Cubiertas',
      3: 'Verificación de Fluidos',
      4: 'Vidrios y Parabrisas',
      5: 'Extintor',
      6: 'Documentos Legales',
      7: 'Frenos. Dirección',
      8: 'Limpieza del Habitáculo',
      9: 'Resumen del Checklist',
    };

    setSubtitle(subtitles[step] || '');
  }, [step]);


  // Define las funciones para controlar los pasos del formulario
  const nextStep = () => {
    if (step === 1 && formData.datosGenerales.kilometraje == "") {
      setError('El kilometraje es obligatorio.')
      return;
    }
    setStep(prevStep => Math.min(prevStep + 1, 9));
    setError('')
  };

  const prevStep = () => setStep(prevStep => Math.max(prevStep - 1, 1));

  const lastStep = () => {
    if (step === 1 && formData.datosGenerales.kilometraje == "") {
      setError('El kilometraje es obligatorio.')
      return;
    }
    setStep(9);
    setError('')
  };


  const verChecklist = async (checklist) => {
    setChecklistData(null);
    const res = await runCode(`-st checklists -wr id = ${checklist.id}`);
    setChecklistData(res[0]);
    setIsModal2Open(true)
  };

  return (
    <>
      <section className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">Checklist semanal</h1>
          <p className="text-sm text-zinc-400 flex items-center gap-1 leading-3">
            <span className="size-2 rounded-full bg-green-500"></span>
            {user.nombre_usuario}
          </p>
        </div>
        <div className="inline-flex gap-2">
          <Tooltip content="Tema" placement="bottom">
            <DarkModeBtn />
          </Tooltip>
          <Tooltip content="Salir" placement="bottom" >
            <button onClick={logout} className="hover:bg-red-100 hover:dark:bg-red-500/10 text-red-600 h-10 w-10 flex items-center justify-center rounded-full">
              <ArrowRightStartOnRectangleIcon className="size-6" />
            </button>
          </Tooltip>
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {vehiculos.length > 0 ?
          <>
            <div>
              <h2 className="text-md mb-2 font-medium text-zinc-400 dark:text-zinc-500">{vehiculos.length > 1 ? 'Vehículos asignados' : 'Vehículo asignado'}</h2>
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-y-2 sm:gap-y-3 md:gap-y-5 gap-x-3">
                {vehiculos.map((vehiculo) => {

                  let ultimoChecklist = historial.find(checklist => checklist.vehiculo_id === vehiculo.id)

                  const dateToCompare = new Date(ultimoChecklist?.fecha);
                  const isSameWeekResult = isSameWeek(dateToCompare);

                  if (isSameWeekResult) {
                    return (
                      <Card
                        key={vehiculo.id}
                        marca={vehiculo.marca}
                        modelo={vehiculo.modelo}
                        realizado={true}
                        patente={vehiculo.patente}
                        handleClick={() => { verChecklist(ultimoChecklist) }}
                      />
                    )
                  } else {
                    return (
                      <Card
                        key={vehiculo.id}
                        marca={vehiculo.marca}
                        modelo={vehiculo.modelo}
                        realizado={false}
                        patente={vehiculo.patente}
                        handleClick={() => {
                          setVehiculoSelected(vehiculo)
                          setIsModalOpen(true)
                        }}
                      />
                    )
                  }
                })}
              </div>
            </div>

            <div className="rounded-xl border-2 bg-zinc-100 dark:border-zinc-700 pt-4 pb-2 px-2 dark:bg-zinc-800">
              <h2 className="text-md font-medium text-zinc-400 mb-3 px-2">Checklists del mes</h2>
              {historial.length > 0 ?
                <ul className="grid dark:divide-zinc-800">
                  {historial.map((item) => {
                    return (
                      <li key={item.id} onClick={() => verChecklist(item)} className="flex cursor-pointer rounded-lg justify-between items-center py-3 px-4 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200">
                        <div className="flex flex-col">
                          <h3 className="text-md font-medium">{item.marca} {item.modelo}</h3>
                          <p className="text-sm text-zinc-400">{users[item.usuario_id]}</p>
                        </div>
                        <div className="flex-col text-right">
                          <p className="text-sm text-zinc-400">{item?.fecha}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                :
                <div className="text-zinc-600 select-none flex flex-col items-center justify-center text-center w-full gap-2 py-10">
                  <ExclamationTriangleIcon className="size-8" />
                  <p>No hay registros en el historial.</p>
                </div>
              }
            </div>
            {historial.length > 8 &&
              <div className="flex flex-col max-w-64 mx-auto">
                <Button variant="faded" color="green">
                  Ver historial completo
                </Button>
              </div>
            }
          </>

          :

          <div className="text-zinc-600 select-none flex flex-col items-center justify-center text-center w-full gap-2 py-20">
            <ExclamationTriangleIcon className="size-8" />
            <p>Al parecer no tienes vehículos asignados</p>
          </div>
        }
      </section>

      <Modal
        title={
          <p className="inline-flex items-center gap-2">
            {subtitle}
            {step !== 9 &&
              <span className="bg-green-700 font-light text-white px-2.5 py-[2px] rounded-full text-xs">
                {step} / 8
              </span>
            }
          </p>
        }
        subtitle={step === 9 && `Kilometraje actual - ${formData.datosGenerales.kilometraje} km`}
        isOpen={isModalOpen}
        handleModal={closeModal} size="3xl"
      >
        {renderForm()}
        {error !== '' && <p className="text-red-500 text-sm">{error}</p>}
        <footer className="mt-6 gap-2 flex flex-col sm:flex-row justify-end">
          <Button addClassNames="!ring-0" isDisabled={step === 1} onClick={prevStep} variant="ghost" color="zinc">
            Anterior
          </Button>
          <Button addClassNames="!ring-0" isDisabled={step === 9} onClick={nextStep} variant="solid" color="zinc">
            Siguiente
          </Button>
          {step === 9 ?
            <Button onClick={enviarChecklist}>Enviar checklist</Button>
            :
            <Button addClassNames="!ring-0" color="green" onClick={lastStep}>
              Ir al final <ClipboardDocumentCheckIcon className="size-4 ml-2" />
            </Button>
          }
        </footer>
      </Modal>
      {checklistData &&
        <Modal
          title={`Checklist N° ${checklistData.id}`}
          subtitle={`Último kilometraje: ${checklistData.kilometraje}`}
          isOpen={isModal2Open}
          handleModal={closeModal} size="3xl"
          overflow="md:max-h-[600px] overflow-y-auto"
        >
          <ResumenChecklist formData={checklistData} />
        </Modal>
      }
    </>
  )
}