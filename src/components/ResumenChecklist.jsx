import {
  estadoCubiertasOptions,
  nivelesOptions,
  parabrisasOptions,
  espejosVentanasOptions,
  extintorPrecintoOptions,
  extintorCargaOptions,
  extintorFechaVencimientoOptions,
  documentosOptions,
  amortiguadoresFrenosOptions,
  estadoGeneralOptions,
  tableroTapizadosOptions,
  direccionOptions
} from "../utils/valores";

export function ResumenChecklist({ formData = {} }) {
  return (
    <div className="grid gap-y-4 divide-y-2 dark:divide-zinc-800">
      {/* Estado de Cubiertas */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Estado de Cubiertas</h3>
        <ul className="break-words text-md grid sm:grid-cols-2">
          <li>Delantera Izquierda - {getLabelByValue(estadoCubiertasOptions, formData.estado_cubierta_delantera_izquierda)}</li>
          <li>Delantera Derecha - {getLabelByValue(estadoCubiertasOptions, formData.estado_cubierta_delantera_derecha)}</li>
          <li>Trasera Izquierda - {getLabelByValue(estadoCubiertasOptions, formData.estado_cubierta_trasera_izquierda)}</li>
          <li>Trasera Derecha - {getLabelByValue(estadoCubiertasOptions, formData.estado_cubierta_trasera_derecha)}</li>
          <li>Rueda de auxilio - {getLabelByValue(estadoCubiertasOptions, formData.estado_cubierta_auxilio)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.observacion_cubiertas}</p>
      </div>

      {/* Verificación de Fluidos */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Verificación de Fluidos</h3>
        <ul className="break-words text-md grid">
          <li>Agua - {getLabelByValue(nivelesOptions, formData.nivel_agua)}</li>
          <li>Aceite - {getLabelByValue(nivelesOptions, formData.nivel_aceite)}</li>
          <li>Líquido de frenos - {getLabelByValue(nivelesOptions, formData.nivel_frenos)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.observacion_niveles}</p>
      </div>

      {/* Vidrios y Parabrisas */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Vidrios y Parabrisas</h3>
        <ul className="break-words text-md grid">
          <li>Ventanas - {getLabelByValue(espejosVentanasOptions, formData.estado_ventanas)}</li>
          <li>Parabrisas - {getLabelByValue(parabrisasOptions, formData.estado_parabrisas)}</li>
          <li>Espejos Laterales - {getLabelByValue(espejosVentanasOptions, formData.estado_espejos_laterales)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.observacion_vidrios}</p>
      </div>

      {/* Extintor */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Extintor</h3>
        <ul className="break-words text-md grid">
          <li>Carga - {getLabelByValue(extintorCargaOptions, formData.extintor_carga)}</li>
          <li>Precinto - {getLabelByValue(extintorPrecintoOptions, formData.extintor_precinto)}</li>
          <li>Fecha de Vencimiento - {getLabelByValue(extintorFechaVencimientoOptions, formData.extintor_fecha_vencimiento)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.observacion_extintor}</p>
      </div>

      {/* Documentos Legales */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Documentos Legales</h3>
        <ul className="break-words text-md grid">
          <li>VTV - {getLabelByValue(documentosOptions, formData.vtv)}</li>
          <li>Carnet - {getLabelByValue(documentosOptions, formData.carnet_conducir)}</li>
          <li>Tarjeta Verde - {getLabelByValue(documentosOptions, formData.tarjeta_verde)}</li>
          <li>Póliza de Seguro - {getLabelByValue(documentosOptions, formData.poliza)}</li>
          <li>Manejo defensivo - {getLabelByValue(documentosOptions, formData.manejo_defensivo)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.observacion_documentos}</p>
      </div>

      {/* Frenos. Dirección */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Frenos. Dirección</h3>
        <ul className="break-words text-md grid">
          <li>Frenos - {getLabelByValue(amortiguadoresFrenosOptions, formData.estado_frenos_direccion)}</li>
          <li>Dirección - {getLabelByValue(direccionOptions, formData.estado_direccion)}</li>
          <li>Amortiguadores - {getLabelByValue(amortiguadoresFrenosOptions, formData.estado_amortiguadores)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.observacion_frenos_direccion}</p>
      </div>

      {/* Limpieza del Habitáculo */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Limpieza del Habitáculo</h3>
        <ul className="break-words text-md grid">
          <li>Tapizados - {getLabelByValue(tableroTapizadosOptions, formData.estado_tapizados)}</li>
          <li>Estado General - {getLabelByValue(estadoGeneralOptions, formData.estado_general_limpieza)}</li>
          <li>Tablero de Instrumentos - {getLabelByValue(tableroTapizadosOptions, formData.estado_tablero)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.observacion_limpieza}</p>
      </div>
    </div>
  );
}

function getLabelByValue(options, value) {
  const option = options.find(option => option.value === value);
  return option ? <span className={`rounded-full font-medium px-2 text-xs py-[1px] ${option.color}`}>{option.label}</span> : 'N/A';
}