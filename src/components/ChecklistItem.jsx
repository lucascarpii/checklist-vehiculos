export function ChecklistItem({id, marca, modelo, usuario, fecha}) {
  return (
    <li className="relative grid grid-cols-2 gap-4 py-6 sm:grid-cols-4 lg:grid-cols-5">
      <div className="col-span-2 content-center sm:col-span-4 lg:col-span-1">
        <a href="#" className="text-base font-semibold text-gray-900 hover:underline dark:text-white">#FWB127364372</a>
      </div>

      <div className="content-center">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"></path>
          </svg>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">22 May 2024</p>
        </div>
      </div>

      <div className="content-center">
        <div className="flex items-center justify-end gap-2 sm:justify-start">
          <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Reason</span>: Missing parts</p>
        </div>
      </div>

      <div className="absolute right-0 top-7 content-center sm:relative sm:right-auto sm:top-auto">
        <span className="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
          <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"></path>
          </svg>
          Ongoing
        </span>
      </div>

      <div className="col-span-2 content-center sm:col-span-1 sm:justify-self-end">
        <button type="button" className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">View details</button>
      </div>
    </li>
  )
}