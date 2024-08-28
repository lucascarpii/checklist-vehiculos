import { ArrowRightStartOnRectangleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Card } from "../components/Card";
import { Button, Modal, Tooltip } from "tamnora-react";
import { useState, useEffect } from "react";
import { DarkModeBtn } from "../components/DarkModeBtn";

export function Home() {
  const [vehiculos, setVehiculos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false)
  }


  useEffect(() => {
    setVehiculos([
      {
        id: 2,
        marca: 'Ford',
        modelo: 'Ranger',
        patente: 'XYZ789',
        realizado: false,
        ultimoKm: '479807',
      }
    ]);

    setHistorial([
      // {
      //   id: 1,
      //   empleado: 'Juan Martinez',
      //   marca: 'Toyota',
      //   modelo: 'Hilux',
      //   patente: 'ABC123',
      //   realizado: false,
      //   ultimoKm: '479807',
      //   ultimoChecklist: '2023-08-07'
      // },
      // {
      //   id: 2,
      //   empleado: 'Gonzalo Valenzuela',
      //   marca: 'Ford',
      //   modelo: 'Ranger',
      //   patente: 'XYZ789',
      //   realizado: true,
      //   ultimoKm: '479807',
      //   ultimoChecklist: '2023-08-14'
      // }
    ]);
  }, []);


  return (
    <>
      <section className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">Checklist semanal</h1>
          <p className="text-sm text-zinc-400 flex items-center gap-1 leading-3"><span className="size-2 rounded-full bg-green-500"></span> Gonzalo Valenzuela</p>
        </div>
        <div className="inline-flex gap-2">
          <Tooltip content="Tema" placement="bottom">
            <DarkModeBtn />
          </Tooltip>
          <Tooltip content="Salir" placement="bottom" >
            <button className="hover:bg-red-100 hover:dark:bg-red-500/10 text-red-600 h-10 w-10 flex items-center justify-center rounded-full">
              <ArrowRightStartOnRectangleIcon className="size-6" />
            </button>
          </Tooltip>
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {vehiculos.length > 0 ?
          <>
            <div>
              <h2 className="text-lg mb-3">{vehiculos.length > 1 ? 'Vehículos asignados' : 'Vehículo asignado'}</h2>
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-y-2 sm:gap-y-3 md:gap-y-5 gap-x-3">
                {vehiculos.map((vehiculo) => {
                  return (
                    <Card
                      key={vehiculo.id}
                      marca={vehiculo.marca}
                      modelo={vehiculo.modelo}
                      realizado={vehiculo.realizado}
                      patente={vehiculo.patente}
                      km={vehiculo.ultimoKm}
                      handleClick={() => setIsModalOpen(true)}
                    />
                  )
                })}
              </div>
            </div>

            <div className="rounded-xl border-2 bg-zinc-100 dark:border-zinc-700 pt-4 pb-2 px-2 dark:bg-zinc-800">
              <h2 className="text-lg font-medium text-zinc-400 mb-3 px-2">Checklists del mes</h2>
              {historial.length > 0 ?
                <ul className="grid dark:divide-zinc-800">
                  {historial.map((item) => {
                    return (
                      <li key={item.id} className="flex rounded-lg justify-between items-center py-3 px-4 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium">{item.marca} {item.modelo}</h3>
                          <p className="text-sm text-zinc-400">{item.empleado}</p>
                        </div>
                        <div className="flex-col text-right">
                          <p className="text-sm text-zinc-400">{item.ultimoChecklist}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                :
                <div className="text-zinc-600 select-none flex flex-col items-center justify-center text-center w-full gap-2 py-10">
                  <ExclamationTriangleIcon className="size-8" />
                  <p>No hay registros en el historial.</p>
                </div>
              }
            </div>
            {historial.length > 8 &&
              <div className="flex flex-col max-w-64 mx-auto">
                <Button variant="faded" color="sky">
                  Ver historial completo
                </Button>
              </div>
            }
          </>

          :

          <div className="text-zinc-600 select-none flex flex-col items-center justify-center text-center w-full gap-2 py-20">
            <ExclamationTriangleIcon className="size-8" />
            <p>Al parecer no tienes vehículos asignados</p>
          </div>
        }
      </section>

      <Modal isOpen={isModalOpen} handleModal={closeModal} size="2xl">

      </Modal>
    </>
  )
}
