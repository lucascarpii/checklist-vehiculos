import { useEffect } from "react";
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

export function ResumenChecklistModal({ formData }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid gap-y-4 divide-y-2 dark:divide-zinc-800">
      {/* Estado de Cubiertas */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Estado de Cubiertas</h3>
        <ul className="break-words text-md grid sm:grid-cols-2">
          <li>Delantera Izquierda - {getLabelByValue(estadoCubiertasOptions, formData.estadoCubiertas.delanteraIzquierda)}</li>
          <li>Delantera Derecha - {getLabelByValue(estadoCubiertasOptions, formData.estadoCubiertas.delanteraDerecha)}</li>
          <li>Trasera Izquierda - {getLabelByValue(estadoCubiertasOptions, formData.estadoCubiertas.traseraIzquierda)}</li>
          <li>Trasera Derecha - {getLabelByValue(estadoCubiertasOptions, formData.estadoCubiertas.traseraDerecha)}</li>
          <li>Rueda de auxilio - {getLabelByValue(estadoCubiertasOptions, formData.estadoCubiertas.ruedaAuxilio)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.estadoCubiertas.observacion}</p>
      </div>

      {/* Verificación de Fluidos */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Verificación de Fluidos</h3>
        <ul className="break-words text-md grid">
          <li>Agua - {getLabelByValue(nivelesOptions, formData.niveles.agua)}</li>
          <li>Aceite - {getLabelByValue(nivelesOptions, formData.niveles.aceite)}</li>
          <li>Líquido de frenos - {getLabelByValue(nivelesOptions, formData.niveles.frenos)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.niveles.observacion}</p>
      </div>

      {/* Vidrios y Parabrisas */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Vidrios y Parabrisas</h3>
        <ul className="break-words text-md grid">
          <li>Ventanas - {getLabelByValue(espejosVentanasOptions, formData.vidrios.ventanas)}</li>
          <li>Parabrisas - {getLabelByValue(parabrisasOptions, formData.vidrios.parabrisas)}</li>
          <li>Espejos Laterales - {getLabelByValue(espejosVentanasOptions, formData.vidrios.espejosLaterales)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.vidrios.observacion}</p>
      </div>

      {/* Extintor */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Extintor</h3>
        <ul className="break-words text-md grid">
          <li>Carga - {getLabelByValue(extintorCargaOptions, formData.extintor.carga)}</li>
          <li>Precinto - {getLabelByValue(extintorPrecintoOptions, formData.extintor.precinto)}</li>
          <li>Fecha de Vencimiento - {getLabelByValue(extintorFechaVencimientoOptions, formData.extintor.fechaVencimiento)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.extintor.observacion}</p>
      </div>

      {/* Documentos Legales */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Documentos Legales</h3>
        <ul className="break-words text-md grid">
          <li>VTV - {getLabelByValue(documentosOptions, formData.documentos.vtv)}</li>
          <li>Carnet - {getLabelByValue(documentosOptions, formData.documentos.carnet)}</li>
          <li>Tarjeta Verde - {getLabelByValue(documentosOptions, formData.documentos.tarjetaVerde)}</li>
          <li>Póliza de Seguro - {getLabelByValue(documentosOptions, formData.documentos.poliza)}</li>
          <li>Manejo defensivo - {getLabelByValue(documentosOptions, formData.documentos.manejoDefensivo)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.documentos.observacion}</p>
      </div>

      {/* Frenos. Dirección */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Frenos. Dirección</h3>
        <ul className="break-words text-md grid">
          <li>Frenos - {getLabelByValue(amortiguadoresFrenosOptions, formData.frenosDireccion.frenos)}</li>
          <li>Dirección - {getLabelByValue(direccionOptions, formData.frenosDireccion.direccion)}</li>
          <li>Amortiguadores - {getLabelByValue(amortiguadoresFrenosOptions, formData.frenosDireccion.amortiguadores)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.frenosDireccion.observacion}</p>
      </div>

      {/* Limpieza del Habitáculo */}
      <div className="text-zinc-400 pt-4">
        <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-2">Limpieza del Habitáculo</h3>
        <ul className="break-words text-md grid">
          <li>Tapizados - {getLabelByValue(tableroTapizadosOptions, formData.limpieza.tapizados)}</li>
          <li>Estado General - {getLabelByValue(estadoGeneralOptions, formData.limpieza.estadoGeneral)}</li>
          <li>Tablero de Instrumentos - {getLabelByValue(tableroTapizadosOptions, formData.limpieza.tablero)}</li>
        </ul>
        <p className="pt-2">Observaciones: {formData.limpieza.observacion}</p>
      </div>
    </div>
  );
}

function getLabelByValue(options, value) {
  const option = options.find(option => option.value === value);
  return option ? <span className={`rounded-full font-medium px-2 text-xs py-[1px] ${option.color}`}>{option.label}</span> : 'N/A';
}