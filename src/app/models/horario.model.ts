/**
 * Define un horario. Puede ser una hora específica (para citas) o un rango (para consultorios/recepcionistas).
 * Los campos son opcionales porque un horario puede ser de un tipo u otro.
 */
export interface Horario {
  idHorario: number;
  horario?: string;     // Para una hora específica, ej: "14:00:00"
  horaInicio?: string;  // Para un rango, ej: "09:00:00"
  horaFin?: string;     // Para un rango, ej: "17:00:00"
  doctorConsultorios?: number; // ID del doctor asociado a este horario
  recepcionistas?: number; // ID del recepcionista asociado a este horario
  HoraFinValida?: string; // ID de la cita asociada a este horario, si es que es una hora específica
}