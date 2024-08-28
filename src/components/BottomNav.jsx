import { ArchiveBoxIcon, HomeIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/auth";

export function BottomNav() {
  const auth = useAuth()

  if (!auth.user) {
    return null
  }

  const activeStyle = 'flex flex-col items-center justify-center px-3 py-3 bg-green-50 dark:bg-zinc-800 text-green-600 dark:text-white rounded-2xl w-[60px] focus:outline-none'
  const baseStyle = 'flex flex-col items-center justify-center px-3 py-3 rounded-2xl text-black dark:text-white/70 w-[60px] focus:outline-none focus:bg-zinc-100 hover:bg-zinc-100 dark:focus:bg-zinc-900 dark:hover:bg-zinc-900'
  return (
    <nav className="fixed bottom-3 left-0 w-full px-3 flex justify-center lg:hidden z-50">
      <ul className="bg-white/70 dark:bg-zinc-950/70 backdrop-filter border-2 dark:border-zinc-800 backdrop-blur-sm w-full max-w-sm flex justify-between py-1.5 px-3 rounded-2xl shadow-xl shadow-black/10 text-zinc-700">
        {routes.map(route => {
          return (
            <NavLink key={route.to} to={route.to}
              className={({ isActive }) => isActive ? activeStyle : baseStyle}
              title={route.text}
            >
              {route.icon}
              <span className="text-[8px] font-medium">
                {route.text}
              </span>
            </NavLink>
          )
        })}
      </ul>
    </nav>
  )
}

const routes = [];
routes.push({
  to: '/',
  text: 'Inicio',
  icon: <HomeIcon className="size-6" />
});
routes.push({
  to: '/historial',
  text: 'Historial',
  icon: <ArchiveBoxIcon className="size-6" />
});