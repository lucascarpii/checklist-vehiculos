import { ArrowRightStartOnRectangleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Card } from "../components/Card";
import { Button, Input, Modal, Select, Textarea, Tooltip } from "tamnora-react";
import { useState, useEffect } from "react";
import { DarkModeBtn } from "../components/DarkModeBtn";

export function Home() {
  const [vehiculos, setVehiculos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [step, setStep] = useState(1);
  const [subtitle, setSubtitle] = useState('');
  const [responses, setResponses] = useState({});

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value
    });
  };

  function closeModal() {
    setStep(1)
    setIsModalOpen(false);
  }

  useEffect(() => {
    setVehiculos([
      {
        id: 2,
        marca: 'Ford',
        modelo: 'Ranger',
        patente: 'XYZ789',
        realizado: false,
        ultimoKm: '479807',
      }
    ]);

    setHistorial([
      {
        id: 1,
        empleado: 'Juan Martinez',
        marca: 'Toyota',
        modelo: 'Hilux',
        patente: 'ABC123',
        realizado: false,
        ultimoKm: '479807',
        ultimoChecklist: '2023-08-07'
      },
      {
        id: 2,
        empleado: 'Gonzalo Valenzuela',
        marca: 'Ford',
        modelo: 'Ranger',
        patente: 'XYZ789',
        realizado: true,
        ultimoKm: '479807',
        ultimoChecklist: '2023-08-14'
      }
    ]);
  }, []);


  function renderForm() {
    if (step == 1) {
      return (
        <form action="">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input isReadOnly label="Patente" defaultValue="OBJ680" variant="faded" />
            <Input isReadOnly label="Fecha" defaultValue="04/08/2024" variant="faded" />
          </div>
          <div className="grid grid-cols-1 gap-3 mt-3">
            <Input label="Kilometraje" placeholder="Ingresar km del vehiculo" variant="faded" />
          </div>
        </form>
      )
    }

    if (step == 2) {
      // [Buen estado / Desgaste leve / Desgaste severo / Neumático pinchado]
      let options = [
        { value: 0, label: 'Neumático pinchado' },
        { value: 1, label: 'Desgaste severo' },
        { value: 2, label: 'Desgaste leve' },
        { value: 3, label: 'Buen estado' }
      ]
      return (
        <form action="">
          <div className="grid sm:grid-cols-2 gap-3">
            <Select defaultValue={3} variant="faded" label="Delantera izquierda" options={options} />
            <Select defaultValue={3} variant="faded" label="Delantera derecha" options={options} />
            <Select defaultValue={3} variant="faded" label="Trasera izquierda" options={options} />
            <Select defaultValue={3} variant="faded" label="Trasera derecha" options={options} />
          </div>
          <div className="grid gap-3 mt-3">
            <Select defaultValue={3} variant="faded" label="Rueda de auxilio" options={options} />
            <Textarea variant="faded" label="Observaciones" placeholder="Ingresar detalles extra de las cubiertas en caso de ser necesario." />
          </div>
        </form>
      )
    }

    if (step == 3) {
      let options = [
        { value: 0, label: 'Observaciones' },
        { value: 1, label: 'Fuga' },
        { value: 2, label: 'Bajo' },
        { value: 3, label: 'Normal' }
      ];

      return (
        <form action="">
          <div className="grid sm:grid-cols-2 gap-3">
            <Select defaultValue={3} variant="faded" label="Nivel de Aceite" options={options} />
            <Select defaultValue={3} variant="faded" label="Nivel de Agua" options={options} />
            <Select defaultValue={3} variant="faded" label="Nivel de Líquido de Frenos" options={options} />
          </div>
          <div className="grid gap-3 mt-3">
            <Textarea variant="faded" label="Otros Fluidos" placeholder="Ingresar detalles sobre otros fluidos en caso de ser necesario." />
          </div>
        </form>
      )
    }

    if (step == 4) {
      let optionsParabrisas = [
        { value: 0, label: 'Otros daños' },
        { value: 1, label: 'Rajado' },
        { value: 2, label: 'Astillado' },
        { value: 3, label: 'Sano' }
      ];

      let optionsEspejosVentanas = [
        { value: 0, label: 'Otros daños' },
        { value: 1, label: 'Rotura severa' },
        { value: 2, label: 'Rotura leve' },
        { value: 3, label: 'Sanos' }
      ];

      return (
        <form action="">
          <div className="grid sm:grid-cols-2 gap-3">
            <Select defaultValue={3} variant="faded" label="Parabrisas" options={optionsParabrisas} />
            <Select defaultValue={3} variant="faded" label="Espejos Laterales" options={optionsEspejosVentanas} />
          </div>
          <div className="grid gap-3 mt-3">
            <Select defaultValue={3} variant="faded" label="Ventanas" options={optionsEspejosVentanas} />
          </div>
        </form>
      )
    }

    if (step == 5) {
      let optionsPrecinto = [
        { value: 0, label: 'Ausente' },
        { value: 1, label: 'Roto' },
        { value: 2, label: 'Intacto' }
      ];

      let optionsCarga = [
        { value: 0, label: 'Vacía' },
        { value: 1, label: 'Incompleta' },
        { value: 2, label: 'Completa' }
      ];

      let optionsFechaVencimiento = [
        { value: 0, label: 'Vencida' },
        { value: 1, label: 'Vigente' }
      ];

      return (
        <form action="">
          <div className="grid sm:grid-cols-3 gap-3">
            <Select defaultValue={2} variant="faded" label="Precinto" options={optionsPrecinto} />
            <Select defaultValue={2} variant="faded" label="Carga" options={optionsCarga} />
            <Select defaultValue={1} variant="faded" label="Fecha de Vencimiento" options={optionsFechaVencimiento} />
          </div>
        </form>
      )
    }

    if (step == 6) {
      let optionsDocumentos = [
        { value: 0, label: 'No aplicable' },
        { value: 1, label: 'Vencida' },
        { value: 2, label: 'Vigente' }
      ];

      return (
        <form action="">
          <div className="grid sm:grid-cols-3 gap-3">
            <Select defaultValue={2} variant="faded" label="VTV" options={optionsDocumentos} />
            <Select defaultValue={2} variant="faded" label="Póliza de Seguro" options={optionsDocumentos} />
            <Select defaultValue={2} variant="faded" label="Tarjeta Verde" options={optionsDocumentos} />
          </div>
        </form>
      )
    }

    if (step == 7) {
      let optionsAmortiguadoresFrenos = [
        { value: 0, label: 'Requiere cambio' },
        { value: 1, label: 'Desgaste severo' },
        { value: 2, label: 'Desgaste leve' },
        { value: 3, label: 'Buen estado' }
      ];

      let optionsDireccion = [
        { value: 0, label: 'Otros problemas' },
        { value: 1, label: 'Juego en dirección' },
        { value: 2, label: 'Funciona correctamente' }
      ];

      return (
        <form action="">
          <div className="grid sm:grid-cols-2 gap-3">
            <Select defaultValue={3} variant="faded" label="Amortiguadores" options={optionsAmortiguadoresFrenos} />
            <Select defaultValue={3} variant="faded" label="Frenos" options={optionsAmortiguadoresFrenos} />
          </div>
          <div className="grid gap-3 mt-3">
            <Select defaultValue={2} variant="faded" label="Dirección" options={optionsDireccion} />
          </div>
        </form>
      )
    }

    if (step == 8) {
      let optionsEstadoGeneral = [
        { value: 0, label: 'Muy sucio' },
        { value: 1, label: 'Sucio' },
        { value: 2, label: 'Limpio' }
      ];

      let optionsTableroTapizados = [
        { value: 0, label: 'Daños' },
        { value: 1, label: 'Desgaste' },
        { value: 2, label: 'Sucios' },
        { value: 3, label: 'Limpios' }
      ];

      return (
        <form action="">
          <div className="grid sm:grid-cols-2 gap-3">
            <Select defaultValue={2} variant="faded" label="Estado General" options={optionsEstadoGeneral} />
            <Select defaultValue={3} variant="faded" label="Tablero de Instrumentos" options={optionsTableroTapizados} />
          </div>
          <div className="grid gap-3 mt-3">
            <Select defaultValue={3} variant="faded" label="Tapizados" options={optionsTableroTapizados} />
          </div>
        </form>
      )
    }
  }

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
    };

    setSubtitle(subtitles[step] || '');
  }, [step]);

  const nextStep = () => setStep(prevStep => Math.min(prevStep + 1, 8));
  const prevStep = () => setStep(prevStep => Math.max(prevStep - 1, 1));

  return (
    <>
      <section className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">Checklist semanal</h1>
          <p className="text-sm text-zinc-400 flex items-center gap-1 leading-3"><span className="size-2 rounded-full bg-green-500"></span> Gonzalo Valenzuela</p>
        </div>
        <div className="inline-flex gap-2">
          <Tooltip content="Tema" placement="bottom">
            <DarkModeBtn />
          </Tooltip>
          <Tooltip content="Salir" placement="bottom" >
            <button className="hover:bg-red-100 hover:dark:bg-red-500/10 text-red-600 h-10 w-10 flex items-center justify-center rounded-full">
              <ArrowRightStartOnRectangleIcon className="size-6" />
            </button>
          </Tooltip>
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {vehiculos.length > 0 ?
          <>
            <div>
              <h2 className="text-lg mb-3">{vehiculos.length > 1 ? 'Vehículos asignados' : 'Vehículo asignado'}</h2>
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-y-2 sm:gap-y-3 md:gap-y-5 gap-x-3">
                {vehiculos.map((vehiculo) => {
                  return (
                    <Card
                      key={vehiculo.id}
                      marca={vehiculo.marca}
                      modelo={vehiculo.modelo}
                      realizado={vehiculo.realizado}
                      patente={vehiculo.patente}
                      km={vehiculo.ultimoKm}
                      handleClick={() => setIsModalOpen(true)}
                    />
                  )
                })}
              </div>
            </div>

            <div className="rounded-xl border-2 bg-zinc-100 dark:border-zinc-700 pt-4 pb-2 px-2 dark:bg-zinc-800">
              <h2 className="text-lg font-medium text-zinc-400 mb-3 px-2">Checklists del mes</h2>
              {historial.length > 0 ?
                <ul className="grid dark:divide-zinc-800">
                  {historial.map((item) => {
                    return (
                      <li key={item.id} className="flex rounded-lg justify-between items-center py-3 px-4 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium">{item.marca} {item.modelo}</h3>
                          <p className="text-sm text-zinc-400">{item.empleado}</p>
                        </div>
                        <div className="flex-col text-right">
                          <p className="text-sm text-zinc-400">{item.ultimoChecklist}</p>
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
                <Button variant="faded" color="sky">
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
        title="Checklist semanal"
        subtitle={`${subtitle} - Paso ${step}/8`}
        isOpen={isModalOpen}
        handleModal={closeModal} size="3xl">
        {renderForm()}
        <footer className="mt-6 gap-2 flex flex-col sm:flex-row justify-end">
          <Button onClick={prevStep} variant="ghost">
            Anterior
          </Button>
          <Button onClick={nextStep}>
            Siguiente
          </Button>
        </footer>
      </Modal>
    </>
  )
}
