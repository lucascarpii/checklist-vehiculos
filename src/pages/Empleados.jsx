import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, AutoForm, AutoTable, Button, dbSelect, Modal, runCode, runCodeStruc } from "tamnora-react";


export function Empleados() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [dataStruc, setDataStruc] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [alertData, setAlertData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [idSelected, setIdSelected] = useState(0);

  const getData = async () => {
    await runCodeStruc('-st usuarios WHERE tipo_usuario = 0', 'usuarios').then(res => {
      setTableData(res.data)
      setDataStruc(res.struc.types)
    })
  };

  useEffect(() => {
    getData();
  }, [isModalOpen]);

  useEffect(() => { window.scrollTo(0, 0) }, []);

  function closeModal() {
    setIsModalOpen(false)
  }

  async function updateData(e) {
    await dbSelect(e.query.tipo, e.query.sql).then((res) => {
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


  const deleteData = async () => {
    try {
      const tipo = 'd';
      const sql = `DELETE FROM usuarios WHERE id = ${idSelected}`;

      await dbSelect(tipo, sql).then(val => {
        getData();
        setIdSelected(0)
        setIsModalOpen(!isModalOpen);
        setShowAlert(true)
        setAlertData({
          icon: true,
          type: 'success',
          title: 'Proceso Finalizado',
          message: `Se ha BORRADO al cliente Nro ${idSelected}`
        })
        // console.log(val)
      })
    } catch (err) {
      closeModal()
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
  };


  const verCliente = async (rowData) => {
    setFormData(null);
    const res = await runCode(`-st usuarios -wr id = ${rowData.id}`);
    setFormData(res[0]);
    setIdSelected(res[0].id)
    setIsModalOpen(true)
  };
  const nuevoCliente = () => {
    setFormData({
      id: 0,
      nombre_usuario: '',
      contraseña: '',
      tipo_usuario: 'empleado'
    });
    setIdSelected(0)
    setIsModalOpen(true)
  };

  return (
    <>
      {showAlert && (
        <Alert
          icon={alertData.icon}
          type={alertData.type}
          title={alertData.title}
          message={alertData.message}
          timeOff={4000}
          position="top-right"
          onClose={() => setShowAlert(false)}
        />
      )}

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
        <AutoTable renderCell={(data) => {
          if (data.column == 'tipo_usuario') {
            if (data.value == 0) {
              return 'Empleado'
            }
          } else {
            return data.value
          }
        }} columnNames={{ nombre_usuario: 'nombre', tipo_usuario: 'tipo' }} data={tableData} onRowClick={verCliente} />
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
            onDelete={deleteData}
            primaryKey="id"
            struc={dataStruc}
            idSelected={idSelected}
            textSubmit={idSelected > 0 ? 'Actualizar' : 'Guardar'}
            table="usuarios"
            isHidden={['id']}
            isRequired={['nombre_usuario', 'contraseña', 'tipo_usuario']}
            colsWidth={{ nombre_usuario: 'col-span-12 sm:col-span-4', contraseña: 'col-span-12 sm:col-span-4', tipo_usuario: 'col-span-12 sm:col-span-4' }}
            names={{ nombre_usuario: 'Nombre y apellido', contraseña: 'Contraseña', tipo_usuario: 'Tipo de usuario' }}
            types={{ tipo_usuario: { type: 'select', options: [{ value: 0, label: 'Empleado' }, { value: 1, label: 'Administrador' }] } }}
          />
        </Modal>
      }
    </>
  )
}