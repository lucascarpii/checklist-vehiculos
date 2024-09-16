import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AutoForm, Button, Modal, runCode, runCodeStruc, Table } from "tamnora-react";


export function Empleados() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [alertData, setAlertData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [idSelected, setIdSelected] = useState(0);

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
  function updateData(e) {
    console.log(e)
  }

  const verCliente = async (rowData) => {
    setFormData(null);
    const res = await runCode(`-st usuarios -wr id = ${rowData.id}`);
    setFormData(res[0]);
    setIdSelected(res[0].id)
    setIsModalOpen(true)
  };
  const nuevoCliente = () => {
    setFormData({
      nombre_usuario: '',
      contraseña: '',
      tipo_usuario: 'empleado'
    });
    setIdSelected(0)
    setIsModalOpen(true)
  };

  return (
    <>
      <section className="flex flex-col mb-20">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <Link to="/admin" className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full">
              <ArrowLeftIcon className="size-4" />
            </Link>
            <h2 className="text-xl">Empleados</h2>
          </div>
          <Button color="green" onClick={nuevoCliente}>
            Nuevo
          </Button>
        </div>
        <Table columnNames={{ nombre_usuario: 'nombre', tipo_usuario: 'tipo' }} data={tableData} onRowClick={verCliente} />
      </section>
      {
        formData &&
        <Modal
          title={idSelected > 0 ? 'Editar usuario' : 'Crear nuevo usuario'}
          subtitle={idSelected > 0 ? 'Modifica los datos del usuario seleccionado' : 'Completa los campos para crear un nuevo usuario'}
          isOpen={isModalOpen}
          handleModal={closeModal}
          size="3xl"
        >
          <AutoForm
            data={formData}
            onSubmit={updateData}
            primaryKey="id"
            idSelected={idSelected}
            textSubmit={idSelected > 0 ? 'Actualizar' : 'Guardar'}
            table="usuarios"
            isHidden={['id']}
            isRequired={['nombre_usuario', 'contraseña', 'tipo_usuario']}
            colsWidth={{ nombre_usuario: 'col-span-12 sm:col-span-4', contraseña: 'col-span-12 sm:col-span-4', tipo_usuario: 'col-span-12 sm:col-span-4' }}
            names={{ nombre_usuario: 'Nombre y apellido', contraseña: 'Contraseña', tipo_usuario: 'Tipo de usuario' }}
            types={{ tipo_usuario: { type: 'select', options: [{ value: 'empleado', label: 'Empleado' }, { value: 'administrador', label: 'Administrador' }] } }}
          />
        </Modal>
      }
    </>
  )
}