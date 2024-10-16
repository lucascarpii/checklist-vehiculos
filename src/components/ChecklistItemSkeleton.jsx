export function ChecklistItemSkeleton() {
  return (
    <div className="relative grid grid-cols-2 gap-4 py-4 sm:grid-cols-4 animate-pulse">
      <div className="flex flex-col justify-center gap-1">
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-lg h-[16px] w-32"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-lg h-[12px] w-24"></div>
      </div>
      <div className="flex flex-col items-end gap-1 sm:items-center sm:justify-center">
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-lg h-[14px] w-28"></div>
        <div className="bg-zinc-200 sm:hidden dark:bg-zinc-800 h-[16px] rounded-full w-20"></div>
      </div>
      <div className="hidden sm:flex justify-end items-center sm:justify-center">
        <div className="bg-zinc-200 dark:bg-zinc-800 h-[16px] rounded-full w-20"></div>
      </div>
      <div className="col-span-2 content-center sm:col-span-1 sm:justify-self-end" >
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-lg h-[37.6px] w-full sm:w-[115.34px]"></div>
      </div>
    </div>
  )
}