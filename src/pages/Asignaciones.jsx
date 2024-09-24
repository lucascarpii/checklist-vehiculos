import { useEffect, useState } from "react";
import { AutoTable, Button, runCode, runCodeStruc, Select } from "tamnora-react";

export function Asignaciones() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empleadosList, setEmpleadosList] = useState(null);
  const [vehiculosList, setVehiculosList] = useState(null);
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
    await runCode('-sl id, nombre_usuario -fr usuarios').then(res => {
      console.log(res)
      setEmpleadosList(res)
    })
    await runCode('-sl id, patente -fr vehiculos').then(res => {
      console.log(res)
      setVehiculosList(res)
    })
  };

  useEffect(() => {
    getData();
  }, [isModalOpen]);

  return (
    <>
      <section>
        <div className="grid sm:grid-cols-3 items-end gap-2 mb-6">
          <Select radius="rounded-lg" variant="faded" labelPlacement="outside" placeholder="Seleccionar empleado" options={[{ value: 0, label: 'Empleado 1' }]} />
          <Select radius="rounded-lg" variant="faded" labelPlacement="outside" placeholder="Seleccionar vehiculo" options={[{ value: 0, label: 'Vehiculo 1' }]} />
          <Button color="sky">
            Crear asignación
          </Button>
        </div>
        <AutoTable />
      </section>
    </>
  )
}