import { useAuth } from "../utils/auth";
import { NavLink } from "react-router-dom";
import { LogoutBtn } from "./LogoutBtn";
import { TextDarkModeButton } from "./TextDarkModeBtn";
import { HomeIcon, ArchiveBoxIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "tamnora-react";

const Sidebar = () => {
  const auth = useAuth();

  if (!auth.user) {
    return null;
  }

  const nameUser = auth.user.user_name + ' ' + auth.user.user_surname;
  const userRole = auth.user.user_role;

  const activeStyle = 'flex items-center gap-2 w-fit 2xl:w-full 2xl:h-10 py-2 px-2 2xl:px-4 rounded-md text-sky-700 bg-sky-700/5 dark:text-zinc-100 dark:bg-white/5';
  const baseStyle = 'flex items-center gap-2 w-fit 2xl:w-full 2xl:h-10 py-2 px-2 2xl:px-4 rounded-md text-zinc-500 hover:bg-sky-700/5 hover:text-sky-700 dark:hover:text-zinc-100 dark:hover:bg-white/5';

  // Filtra rutas basadas en el rol del usuario
  const filteredRoutes = routes.filter(route => {
    if (userRole == "3" && (route.to === "/empresa" || route.to === "/presupuestos" || route.to === "/admin-users")) {
      return false; // Si el rol es "3", no muestra estas rutas
    }
    return true;
  });

  return (
    <aside className="bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-300 dark:border-zinc-800 hidden lg:block fixed top-0 left-0 z-10 w-full max-w-[90px] 2xl:max-w-[280px] h-full py-8 2xl:px-6 text-sm font-medium font-pop border-r shadow-lg">
      <div className="flex flex-col sm:max-2xl:items-center gap-6 justify-between h-full">
        <div className="2xl:pb-4 2xl:px-4 mt-2">
          <NavLink to={'/'}>
            <div className="flex items-center gap-2">
              <img src="/vite.svg" className="h-8 rounded-lg object-cover mx-auto 2xl:mx-0" alt="vite logo" />
              <span className="hidden 2xl:block text-zinc-700 dark:text-zinc-200 font-medium text-xl">Checklist</span>
            </div>
          </NavLink>
          {/* <p className="text-zinc-400 font-normal text-sm hidden 2xl:block mt-1">{nameUser}</p> */}
        </div>
        <ul className="flex-col gap-2 flex 2xl:hidden">
          {filteredRoutes.map(route => (
            <Tooltip placement="right" content={route.text} key={route.to}>
              <NavLink key={route.to} to={route.to}
                className={({ isActive }) => isActive ? activeStyle : baseStyle}
              >
                {route.icon}
                <span className="hidden 2xl:block">
                  {route.text}
                </span>
              </NavLink>
            </Tooltip>
          ))}
        </ul>
        <ul className="flex-col gap-2 hidden 2xl:flex">
          {filteredRoutes.map(route => (
            <NavLink key={route.to} to={route.to}
              className={({ isActive }) => isActive ? activeStyle : baseStyle}
              title={route.text}
            >
              {route.icon}
              <span className="hidden 2xl:block">
                {route.text}
              </span>
            </NavLink>
          ))}
        </ul>

        <footer className="mt-auto flex flex-col justify-center items-center gap-1 border-t dark:border-zinc-800 pt-4">
          <TextDarkModeButton />
          <LogoutBtn />
        </footer>
      </div>
    </aside>
  );
}

const routes = [];
routes.push({
  to: '/',
  text: 'Inicio',
  icon: <HomeIcon className="size-5" />
});
routes.push({
  to: '/historial',
  text: 'Historial',
  icon: <ArchiveBoxIcon className="size-5" />
});
export { Sidebar };