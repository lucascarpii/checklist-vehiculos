import { ArrowRightStartOnRectangleIcon, TruckIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { structure, Tooltip } from "tamnora-react"
import { DarkModeBtn } from "../components/DarkModeBtn"
import { useAuth } from "../utils/auth"
import { Link } from "react-router-dom"

export function AdminHome() {
  const { logout, user } = useAuth()
  return (
    <>
      <section className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">Checklist semanal</h1>
          <p className="text-sm text-zinc-400 flex items-center gap-1 leading-3">
            <span className="size-2 rounded-full bg-green-500"></span>
            {user.nombre_usuario}
          </p>
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
      <section className="grid md:grid-cols-2 gap-2 mt-10">
        <Link to="/empleados" className="flex items-center gap-2 active:scale-95 bg-zinc-100 hover:bg-zinc-200 border-2 text-zinc-700 dark:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 transition-all duration-300 rounded-xl p-4">
          <UserGroupIcon className="size-5" />
          <span className="-mb-0.5">
            Administrar usuarios
          </span>
        </Link>
        <Link to="/vehiculos" className="flex items-center gap-2 active:scale-95 bg-zinc-100 hover:bg-zinc-200 border-2 text-zinc-700 dark:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 transition-all duration-300 rounded-xl p-4">
          <TruckIcon className="size-5" />
          <span className="-mb-0.5">
            Administrar vehiculos
          </span>
        </Link>
      </section>
    </>
  )
}