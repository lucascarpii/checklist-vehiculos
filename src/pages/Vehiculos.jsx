import { useEffect, useState } from "react";
import { Alert, AutoForm, AutoTable, Button, dbSelect, Modal, runCode, runCodeStruc } from "tamnora-react";


export function Vehiculos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [dataStruc, setDataStruc] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [alertData, setAlertData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [idSelected, setIdSelected] = useState(0);

  const getData = async () => {
    await runCodeStruc('-st vehiculos', 'vehiculos').then(res => {
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

      await runCode(`-sl id, patente -fr vehiculos -wr patente = ${e.formData.patente}`).then(res => {

        if (res.length > 1) {
          if (res[0].id != idSelected) {
            setShowAlert(true);
            setAlertData({
              icon: true,
              type: 'danger',
              title: 'Error',
              message: `La patente ${res[0].patente} ya esta registrada.`,
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
            console.error(tipo, sql)
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

  const verVehiculo = async (rowData) => {
    setFormData(null);
    const res = await runCode(`-st vehiculos -wr id = ${rowData.id}`);
    setFormData(res[0]);
    console.log(res[0])
    setIdSelected(res[0].id)
    setIsModalOpen(true)
  };

  const nuevoVehiculo = () => {
    setFormData({
      id: 0,
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
        <Button color="green" onClick={nuevoVehiculo} addClassNames="xs:!absolute xs:-top-[56px] sm:-top-[71px] xs:!right-0">
          Agregar
        </Button>
        <AutoTable showRowSelection={false} columnNames={{ numero_interno: 'N° Interno' }} data={tableData} onRowClick={verVehiculo} />
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
            struc={dataStruc}
            textSubmit={idSelected > 0 ? 'Actualizar' : 'Guardar'}
            table="vehiculos"
            isHidden={['id']}
            isRequired={['numero_interno', 'patente']}
            colsWidth={{
              numero_interno: 'col-span-12 sm:col-span-6',
              patente: 'col-span-12 sm:col-span-6',
              marca: 'col-span-12 sm:col-span-6',
              modelo: 'col-span-12 sm:col-span-6',
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