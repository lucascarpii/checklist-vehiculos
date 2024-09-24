import React, { useState } from "react"
import { ArrowRightStartOnRectangleIcon, TruckIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { DarkModeBtn } from "../components/DarkModeBtn"
import { useAuth } from "../utils/auth"
import { Tooltip } from "tamnora-react"
import { Empleados } from "./Empleados"
import { Vehiculos } from "./Vehiculos"

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0); // Estado para el tab activo

  return (
    <div className="">
      <div className="flex rounded-xl w-fit bg-zinc-100 dark:bg-zinc-800 p-1">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)} // Manejar clics en la pestaña
            className={`flex items-center px-3 py-2 text-sm font-medium ${index === activeTab
              ? "bg-white shadow-sm dark:bg-zinc-700"
              : "text-zinc-500 dark:text-zinc-400"
              } rounded-lg transition duration-300 ease-in-out`}
          >
            {child.props.icon && <span className="mr-2">{child.props.icon}</span>}
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="mt-6 p-1">
        {/* Mostrar el contenido del tab activo */}
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

const Tab = ({ label, icon, children }) => (
  <div>
    {children}
  </div>
);
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
      <section className="mt-10">
        <Tabs>
          <Tab label="Usuarios" icon={<UserGroupIcon className="size-5" />} >
            <Empleados />
          </Tab>
          <Tab label="Vehículos" icon={<TruckIcon className="size-5" />} >
            <Vehiculos />
          </Tab>
          <Tab label="Asignaciones" icon={<ArrowRightStartOnRectangleIcon className="size-5" />} >
            <h1>Asignaciones</h1>
          </Tab>
        </Tabs>
      </section>
    </>
  )
}