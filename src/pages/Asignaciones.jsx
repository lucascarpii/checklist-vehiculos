import { useEffect, useState } from "react";
import { Alert, AutoForm, AutoTable, Button, dbSelect, Modal, runCode, runCodeStruc, Select } from "tamnora-react";

export function Asignaciones() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [empleadosList, setEmpleadosList] = useState([]);
  const [vehiculosList, setVehiculosList] = useState([]);
  const [empleadoSelected, setEmpleadoSelected] = useState(0);
  const [vehiculoSelected, setVehiculoSelected] = useState(0);
  const [dataStruc, setDataStruc] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [alertData, setAlertData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [idSelected, setIdSelected] = useState(0);

  const getData = async () => {
    await runCodeStruc('-st empleados_vehiculos', 'empleados_vehiculos').then(res => {
      setTableData(res.data)
      setDataStruc(res.struc.types)
    })
    await runCode('-sl id, nombre_usuario -fr usuarios -wr tipo_usuario = 0').then(res => {
      const data = []
      res.forEach((user) => {
        data.push({
          value: user.id,
          label: user.nombre_usuario
        })
      })
      setEmpleadosList(data)
    })
    await runCode('-sl id, patente -fr vehiculos').then(res => {
      const data = []
      res.forEach((vehiculo) => {
        data.push({
          value: vehiculo.id,
          label: vehiculo.patente
        })
      })
      setVehiculosList(data)
    })
  };

  async function crearAsignacion() {
    if (empleadoSelected == 0 || vehiculoSelected == 0) {
      setShowAlert(true)
      setAlertData({
        icon: true,
        type: 'danger',
        title: 'Error',
        message: `Los campos no pueden estar vacios`
      })
      return
    } else {
      try {
        // Verificar si ya existe una asignación con los mismos datos
        const existingAssignment = await runCode(`-st empleados_vehiculos -wr empleado_id = ${empleadoSelected} AND vehiculo_id = ${vehiculoSelected}`);

        if (existingAssignment.length > 0) {
          // Si ya existe una asignación, mostrar alerta
          setShowAlert(true);
          setAlertData({
            icon: true,
            type: 'danger',
            title: 'Error',
            message: `Ya existe una asignación igual.`,
          });
          return; // Detener la creación de la asignación
        }

        // Si no hay una asignación duplicada, crear la asignación
        const tipo = 'i';
        const sql = `INSERT INTO empleados_vehiculos (empleado_id, vehiculo_id) VALUES (${empleadoSelected}, ${vehiculoSelected})`;

        await dbSelect(tipo, sql).then(val => {
          getData()
          setShowAlert(true)
          setAlertData({
            icon: true,
            type: 'success',
            title: 'Proceso Finalizado',
            message: `Se ha creado la asignacion`
          })
        })
      } catch (err) {
        setShowAlert(true)
        setAlertData({
          icon: true,
          type: 'danger',
          title: 'Hubo un error!',
          message: err.message
        })
      } finally {
        // setLoading(false);
      }
    }
  }

  const renderCell = (data) => {
    if (data.column === 'empleado_id') {
      const empleado = empleadosList.find(e => e.value === data.value);
      return empleado ? empleado.label : 'No encontrado';
    } else if (data.column === 'vehiculo_id') {
      const vehiculo = vehiculosList.find(v => v.value === data.value);
      return vehiculo ? vehiculo.label : 'No encontrado';
    } else {
      return data.value;
    }
  };
  useEffect(() => {
    getData();
  }, [isModalOpen]);

  const verAsignacion = async (rowData) => {
    setFormData(null);
    const res = await runCode(`-st empleados_vehiculos -wr id = ${rowData.id}`);
    setFormData(res[0]);
    setIdSelected(res[0].id)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  async function updateData(e) {
    try {
      const tipo = e.query.tipo;
      const sql = e.query.sql;
      let habilitePass = true;

      const existingAssignment = await runCode(`-st empleados_vehiculos -wr empleado_id = ${e.formData.empleado_id} AND vehiculo_id = ${e.formData.vehiculo_id}`);

      if (existingAssignment.length > 0) {
        if (existingAssignment[0].id != idSelected) {
          closeModal()
          setShowAlert(true);
          setAlertData({
            icon: true,
            type: 'danger',
            title: 'Error',
            message: `Ya existe una asignación igual.`,
          });
          habilitePass = false;
        }
      }

      if (habilitePass) {
        await dbSelect(tipo, sql).then((res) => {
          if (res[0].resp == '1') {
            closeModal();
            setShowAlert(true);
            setAlertData({
              icon: true,
              type: 'success',
              title: 'Proceso Finalizado',
              message: 'Se guardó correctamente',
            });
          } else {
            closeModal();
            setShowAlert(true);
            setAlertData({
              icon: true,
              type: 'danger',
              title: 'Proceso Interrumpido',
              message: 'Parece que hubo un error al actualizar',
            });
          }
        });
      }
    } catch (error) {
      closeModal()
      setShowAlert(true);
      setAlertData({
        icon: true,
        type: 'danger',
        title: 'Error',
        message: error.message,
      });
    }
  }
  return (
    <>
      {showAlert && (
        <Alert
          icon={alertData.icon}
          type={alertData.type}
          title={alertData.title}
          message={alertData.message}
          timeOff={2000}
          position="top-right"
          onClose={() => setShowAlert(false)}
        />
      )}
      <section>
        <div className="grid sm:grid-cols-3 items-end gap-2 mb-6">
          <Select
            radius="rounded-lg"
            variant="faded"
            labelPlacement="outside"
            placeholder="Seleccionar empleado"
            options={empleadosList}
            onChange={(e) => setEmpleadoSelected(e)}
          />
          <Select
            radius="rounded-lg"
            variant="faded"
            labelPlacement="outside"
            placeholder="Seleccionar vehiculo"
            options={vehiculosList}
            onChange={(e) => setVehiculoSelected(e)}
          />
          <Button onClick={crearAsignacion} color="green">
            Crear asignación
          </Button>
        </div>
        <AutoTable
          showRowSelection={false}
          data={tableData}
          struc={dataStruc}
          renderCell={renderCell}
          columnNames={{ empleado_id: 'Empleado', vehiculo_id: 'Vehículo' }}
          onRowClick={verAsignacion}
        />
      </section>

      {
        formData &&
        <Modal
          title="Editar asignación"
          isOpen={isModalOpen}
          handleModal={closeModal}
          size="3xl"
        >
          <AutoForm
            data={formData}
            onSubmit={updateData}
            primaryKey="id"
            idSelected={idSelected}
            struc={dataStruc}
            textSubmit="Actualizar"
            table="empleados_vehiculos"
            isHidden={['id']}
            isRequired={['empleado_id', 'vehiculo_id']}
            colsWidth={{
              empleado_id: 'col-span-12 sm:col-span-6',
              vehiculo_id: 'col-span-12 sm:col-span-6',
            }}
            names={{
              empleado_id: 'Empleado',
              vehiculo_id: 'Vehículo',
            }}
            types={{ empleado_id: { type: 'select', options: empleadosList }, vehiculo_id: { type: 'select', options: vehiculosList } }}
          />
        </Modal>
      }
    </>
  )
}