import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, AutoForm, AutoTable, Button, dbSelect, Modal, runCode, runCodeStruc } from "tamnora-react";
import { ResumenChecklist } from "../components/ResumenChecklist";


export function Checklists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [dataStruc, setDataStruc] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [alertData, setAlertData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [idSelected, setIdSelected] = useState(0);

  const getData = async () => {
    await runCodeStruc('-sl id, fecha, usuario_id, vehiculo_id, kilometraje -fr checklists', 'checklists').then(res => {
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

  const verChecklist = async (rowData) => {
    setFormData(null);
    const res = await runCode(`-st checklists -wr id = ${rowData.id}`);
    setFormData(res[0]);
    setIdSelected(res[0].id)
    setIsModalOpen(true)
  };

  const renderView = () => {
    if (isModalOpen && formData) {
      return (
        <>
         <section className="flex items-center justify-between gap-4 relative mb-6">
            <div className="flex items-start gap-2">
              <Button onClick={closeModal} className="hover:bg-zinc-100 hover:dark:bg-zinc-500/10 text-zinc-600 h-8 w-8 flex items-center justify-center rounded-full">
                <ChevronLeftIcon className="size-6" />
              </Button>
              <div>
                <h2 className="text-xl ">Checklist N° {formData.id}</h2>
                <p className="text-zinc-500">Último kilometraje: {formData.kilometraje}</p>
              </div>
            </div>
          </section>
          <ResumenChecklist formData={formData} />
        </>
      )
    } else {
      return (
        <>
          <section className="flex items-center justify-between gap-4 relative mb-6">
            <div className="flex items-start gap-2">
              <Link to="/" className="hover:bg-zinc-100 hover:dark:bg-zinc-500/10 text-zinc-600 h-8 w-8 flex items-center justify-center rounded-full">
                <ChevronLeftIcon className="size-6" />
              </Link>
              <div>
                <h2 className="text-xl ">Historial</h2>
                <p className="text-zinc-500">Vista general de todos los checklist realizados</p>
              </div>
            </div>
          </section>
          <section>
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
            }} columnNames={{ nombre_usuario: 'nombre', tipo_usuario: 'tipo' }} data={tableData} onRowClick={verChecklist} />
          </section>
        </>
      )
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

      <section >
        {renderView()}
      </section>
    </>
  )
}