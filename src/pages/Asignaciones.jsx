import { useEffect, useState } from "react";
import { Alert, AutoTable, Button, dbSelect, runCode, runCodeStruc, Select } from "tamnora-react";

export function Asignaciones() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <AutoTable showRowSelection={false} data={tableData} struc={dataStruc} renderCell={renderCell} columnNames={{ empleado_id: 'Empleado', vehiculo_id: 'Vehículo' }} />
      </section>
    </>
  )
}