import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { structure, Tooltip } from "tamnora-react"
import { DarkModeBtn } from "../components/DarkModeBtn"
import { useAuth } from "../utils/auth"

export function AdminHome() {
  const { logout } = useAuth()

  async function getData() {
    await structure('t', 'vehiculos').then(res => console.log(res))

  }
  return (
    <>
      <section className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">Checklist semanal</h1>
          <p className="text-sm text-zinc-400 flex items-center gap-1 leading-3"><span className="size-2 rounded-full bg-green-500"></span>Gonzalo Valenzuela</p>
        </div>
        <div className="inline-flex gap-2">
          <Tooltip content="Tema" placement="bottom">
            <DarkModeBtn />
          </Tooltip>
          <Tooltip content="Salir" placement="bottom" >
            <button onClick={logout} className="hover:bg-red-100 hover:dark:bg-red-500/10 text-red-600 h-10 w-10 flex items-center justify-center rounded-full">
              <ArrowRightStartOnRectangleIcon className="size-6" />
            </button>
          </Tooltip>
        </div>
      </section>
    </>
  )
}