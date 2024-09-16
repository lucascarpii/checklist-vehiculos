import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { AutoForm, Button, Modal, runCode, Table } from "tamnora-react";


export function Empleados() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [alertData, setAlertData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  const getData = async () => {
    await runCode('-st usuarios WHERE tipo_usuario = "empleado"').then(res => {
      setTableData(res)
    })
  };

  useEffect(() => {
    getData();
  }, [isModalOpen]);

  useEffect(() => { window.scrollTo(0, 0) }, []);

  function closeModal() {
    setIsModalOpen(false)
  }
  function updateData() {
    console.log('hola')
  }

  const verCliente = async (rowData) => {
    setFormData(null);
    const res = await runCode(`-st usuarios -wr id = ${rowData.id}`);
    setFormData(res[0]);
    setIdSelected(res[0].cli_id)
    setIsModalOpen(true)
  };

  return (
    <>
      <section className="flex flex-col mb-20">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-zinc-200 rounded-full"><ArrowLeftIcon className="size-4" /></button>
            <h2 className="text-xl">Empleados</h2>
          </div>
          <Button color="green">
            Nuevo
          </Button>
        </div>
        <Table data={tableData} onRowClick={verCliente} />
      </section>
      {
        formData &&
        <Modal
          isOpen={isModalOpen}
          handleModal={closeModal}
          size="3xl"
        >
          <AutoForm
            data={formData}
            onSubmit={updateData}
            primaryKey="id"
            table="usuarios"
            isHidden={['id']}
            colsWidth={{ nombre_usuario: 'col-span-12 sm:col-span-4', contraseña: 'col-span-12 sm:col-span-4', tipo_usuario: 'col-span-12 sm:col-span-4' }}
            names={{ nombre_usuario: 'Nombre y apellido', contraseña: 'Contraseña', tipo_usuario: 'Tipo de usuario' }}
            types={{ tipo_usuario: { type: 'select', options: [{ value: 'empleado', label: 'Empleado' }, { value: 'administrador', label: 'Administrador' }] } }}
          />
        </Modal>
      }
    </>
  )
}