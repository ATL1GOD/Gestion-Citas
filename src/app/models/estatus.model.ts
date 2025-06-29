/**
 * Representa el estado de una cita o un consultorio (ej. Agendada, Disponible).
 * El ID se llama 'idEstado' en el backend.
 * Archivo de origen: ConsultorioController.java, EstatusController.java
 */
export interface Estatus {
  idEstado: number;
  nombre: string;
}