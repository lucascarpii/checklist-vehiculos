export function Card({
  marca = "",
  modelo = "",
  realizado = false,
  km = "",
  patente = "",
  handleClick = () => { }
}) {

  const options = [
    { value: false, label: 'Sin realizar', color: 'text-white bg-red-600/80' },
    { value: true, label: 'Realizado', color: 'text-white bg-green-600/80' },
  ];

  const estado = options.find(option => option.value === realizado) || { label: 'Sin asignar', color: 'text-zinc-400 bg-zinc-200 dark:text-zinc-400 dark:bg-zinc-600/80' };

  return (
    <div
      onClick={handleClick}
      className="bg-zinc-100 cursor-pointer shadow-sm select-none dark:bg-zinc-800 border-2 dark:border-zinc-700/60 text-zinc-500 dark:text-zinc-500 p-5 rounded-xl hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 transition-all duration-200"
      aria-label={`Tarjeta del vehículo ${marca} ${modelo} con patente ${patente}`}
    >
      <div className="flex justify-between">
        <div className="">
          <h3 className="text-zinc-700 dark:text-zinc-200 font-semibold text-xl">{patente}</h3>
          <p className="text-normal font-medium text-zinc-700 dark:text-zinc-400">{marca} {modelo}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className={`max-w-max px-2 rounded-full text-center font-medium text-sm ${estado.color}`}>
            {estado.label}
          </p>
          <p className="text-sm font-medium text-zinc-400 dark:text-zinc-600">{km} km</p>
        </div>
      </div>
    </div>
  );
}
