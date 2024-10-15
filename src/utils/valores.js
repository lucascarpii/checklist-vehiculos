const colores = {
  rojo: 'text-red-500 bg-red-100 dark:bg-red-500/20',
  naranja: 'text-orange-500 bg-orange-100 dark:bg-orange-500/20',
  amarillo: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-500/20',
  verde: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-500/20',
  gris: 'text-gray-500 bg-gray-100 dark:bg-gray-500/20'
};

export const estadoCubiertasOptions = [
  { value: 0, label: 'Neumático pinchado', color: colores.rojo },
  { value: 1, label: 'Desgaste severo', color: colores.naranja },
  { value: 2, label: 'Desgaste leve', color: colores.amarillo },
  { value: 3, label: 'Buen estado', color: colores.verde }
];

export const nivelesOptions = [
  { value: 0, label: 'Observaciones', color: colores.amarillo },
  { value: 1, label: 'Fuga', color: colores.rojo },
  { value: 2, label: 'Bajo', color: colores.naranja },
  { value: 3, label: 'Normal', color: colores.verde }
];

export const parabrisasOptions = [
  { value: 0, label: 'Otros daños', color: colores.rojo },
  { value: 1, label: 'Rajado', color: colores.naranja },
  { value: 2, label: 'Astillado', color: colores.amarillo },
  { value: 3, label: 'Sano', color: colores.verde }
];

export const espejosVentanasOptions = [
  { value: 0, label: 'Otros daños', color: colores.rojo },
  { value: 1, label: 'Rotura severa', color: colores.naranja },
  { value: 2, label: 'Rotura leve', color: colores.amarillo },
  { value: 3, label: 'Sanos', color: colores.verde }
];

export const extintorPrecintoOptions = [
  { value: 0, label: 'Ausente', color: colores.rojo },
  { value: 1, label: 'Roto', color: colores.naranja },
  { value: 2, label: 'Intacto', color: colores.verde }
];

export const extintorCargaOptions = [
  { value: 0, label: 'Vacía', color: colores.rojo },
  { value: 1, label: 'Incompleta', color: colores.naranja },
  { value: 2, label: 'Completa', color: colores.verde }
];

export const extintorFechaVencimientoOptions = [
  { value: 0, label: 'Vencida', color: colores.rojo },
  { value: 1, label: 'Vigente', color: colores.verde }
];

export const documentosOptions = [
  { value: 0, label: 'No aplicable', color: colores.gris },
  { value: 1, label: 'Vencida', color: colores.rojo },
  { value: 2, label: 'Vigente', color: colores.verde }
];

export const amortiguadoresFrenosOptions = [
  { value: 0, label: 'Requiere cambio', color: colores.rojo },
  { value: 1, label: 'Desgaste severo', color: colores.naranja },
  { value: 2, label: 'Desgaste leve', color: colores.amarillo },
  { value: 3, label: 'Buen estado', color: colores.verde }
];

export const direccionOptions = [
  { value: 0, label: 'Otros problemas', color: colores.rojo },
  { value: 1, label: 'Juego en dirección', color: colores.naranja },
  { value: 2, label: 'Funciona correctamente', color: colores.verde }
];

export const estadoGeneralOptions = [
  { value: 0, label: 'Muy sucio', color: colores.rojo },
  { value: 1, label: 'Sucio', color: colores.naranja },
  { value: 2, label: 'Limpio', color: colores.verde }
];

export const tableroTapizadosOptions = [
  { value: 0, label: 'Daños', color: colores.rojo },
  { value: 1, label: 'Desgaste', color: colores.naranja },
  { value: 2, label: 'Sucios', color: colores.amarillo },
  { value: 3, label: 'Limpios', color: colores.verde }
];