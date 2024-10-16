import { CalendarDateRangeIcon } from "@heroicons/react/20/solid";
import { formatDate } from "tamnora-react";

export function ChecklistItem({ id, vehiculo, usuario, fecha, buttonOnClick = () => { } }) {

  return (
    <li className="relative grid grid-cols-2 gap-4 py-4 sm:grid-cols-4">
      <div className="content-center flex flex-col">
        <span className="text-base font-medium text-zinc-900 dark:text-zinc-300">{vehiculo.marca} {vehiculo.modelo}</span>
        <p className="text-xs font-medium text-zinc-500">{usuario}</p>
      </div>

      <div className="content-center">
        <div className="flex items-center justify-end gap-2 sm:justify-center ">
          <CalendarDateRangeIcon className="size-4" />
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{formatDate(fecha, '/').fechaEs}</p>
        </div>
      </div>

      <div className="absolute right-0 top-7 content-center sm:relative sm:right-auto sm:top-auto sm:mx-auto">
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-500 dark:bg-emerald-500/20">
          Realizado
        </span>
      </div>

      <div className="col-span-2 content-center sm:col-span-1 sm:justify-self-end">
        <button
          onClick={buttonOnClick}
          type="button"
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 hover:text-emerald-700 focus:z-10 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white sm:w-auto">
          Ver checklist
        </button>
      </div>
    </li>
  )
}