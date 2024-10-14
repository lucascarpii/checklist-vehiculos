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
    await runCodeStruc('-st usuarios', 'usuarios').then(res => {
      setTableData(res.data)
      setDataStruc(res.struc.types)
    })
  };

  useEffect(() => {
    getData();
  }, [isModalOpen]);

  function closeModal() {
    setIsModalOpen(false)
  }

  async function updateData(e) {
    try {
      const tipo = e.query.tipo;
      const sql = e.query.sql;
      let habilitePass = true;

      await runCode(`-sl id, nombre_usuario -fr usuarios -wr contraseña = ${e.formData.contraseña}`).then(res => {
        if (res.length > 0) {
          if (res[0].id != idSelected) {
            setShowAlert(true);
            setAlertData({
              icon: true,
              type: 'danger',
              title: 'Error',
              message: `El usuario ${res[0].nombre_usuario} tiene esta contraseña asignada.`,
            });
            habilitePass = false;
          }
        } else {
        }

      })
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


  const verUsuario = async (rowData) => {
    setFormData(null);
    const res = await runCode(`-st usuarios -wr id = ${rowData.id}`);
    setFormData(res[0]);
    setIdSelected(res[0].id)
    setIsModalOpen(true)
  };
  const nuevoUsuario = () => {
    setFormData({
      id: 0,
      nombre_usuario: '',
      contraseña: '',
      tipo_usuario: 0
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
          timeOff={2000}
          position="top-right"
          onClose={() => setShowAlert(false)}
        />
      )}

      <section className="flex flex-col gap-4 relative">
        <AutoTable showRowSelection={false} renderCell={(data) => {
          if (data.column == 'tipo_usuario') {
            if (data.value == 0) {
              return 'Empleado'
            } else {
              return 'Administrador'
            }
          } else {
            return data.value
          }
        }} columnNames={{ nombre_usuario: 'nombre', tipo_usuario: 'tipo' }} data={tableData} onRowClick={verUsuario} />
        <Button color="sky" onClick={nuevoUsuario} addClassNames="sm:!absolute sm:-top-[71px] sm:!right-0">
          Agregar
        </Button>
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