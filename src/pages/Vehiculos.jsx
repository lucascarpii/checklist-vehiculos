import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AutoForm, Button, Modal, runCode, Table } from "tamnora-react";


export function Vehiculos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [alertData, setAlertData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [idSelected, setIdSelected] = useState(0);

  const getData = async () => {
    await runCode('-st vehiculos').then(res => {
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

  const verVehiculo = async (rowData) => {
    setFormData(null);
    const res = await runCode(`-st vehiculos -wr id = ${rowData.id}`);
    setFormData(res[0]);
    setIdSelected(res[0].id)
    setIsModalOpen(true)
  };
  const nuevoVehiculo = () => {
    setFormData({
      numero_interno: '',
      patente: '',
      marca: '',
      modelo: '',
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
            <h2 className="text-xl">Vehiculo</h2>
          </div>
          <Button color="green" onClick={nuevoVehiculo}>
            Nuevo
          </Button>
        </div>
        <Table columnNames={{ numero_interno: 'N° Interno' }} data={tableData} onRowClick={verVehiculo} />
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
            table="vehiculos"
            isHidden={['id']}
            isRequired={['nombre_usuario', 'contraseña', 'tipo_usuario']}
            colsWidth={{
              numero_interno: 'col-span-12 sm:col-span-4',
              patente: 'col-span-12 sm:col-span-4',
              marca: 'col-span-12 sm:col-span-4',
              modelo: 'col-span-12 sm:col-span-4',
            }}
            names={{
              numero_interno: 'N° Interno',
              patente: 'Patente',
              marca: 'Marca',
              modelo: 'Modelo',
            }}
          />
        </Modal>
      }
    </>
  )
}