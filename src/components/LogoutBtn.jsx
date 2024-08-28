import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { useAuth } from "../utils/auth"

export function LogoutBtn({ mediaQueries = "hidden 2xl:block" }) {
  const { logout } = useAuth()

  return (
    <button onClick={logout} className="flex items-center justify-center gap-2 py-2 px-2 2xl:px-4 text-red-700 rounded-md w-full hover:bg-red-700/5 dark:hover:bg-red-400/10">
      <ArrowLeftStartOnRectangleIcon className="size-5" />
      <span className={mediaQueries}>
        Cerrar Sesión
      </span>
    </button>
  )
}