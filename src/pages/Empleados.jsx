import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button, Modal, runCode, Table } from "tamnora-react";


export function Empleados() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersOnDB, setUsersOnDB] = useState([]);


  useEffect(() => {
    runCode('-st usuarios WHERE tipo_usuario = "empleado"').then(res => setUsersOnDB(res))
  }, [])
  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <section className="flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-zinc-200 rounded-full"><ArrowLeftIcon className="size-4" /></button>
            <h2 className="text-xl">Empleados</h2>
          </div>
          <Button color="green">
            Nuevo
          </Button>
        </div>
        <Table data={usersOnDB} />
      </section>

      <Modal
        isOpen={isModalOpen}
        handleModal={closeModal}
        size="3xl">

      </Modal>
    </>
  )
}