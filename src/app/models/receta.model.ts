import { Doctor } from './doctor.model';
import { DoctorReceta } from './doctor.model';
import { Paciente } from './paciente.model';
import { PacienteReceta } from './paciente.model';
import { RecetaDetalle } from './receta-detalle.model';
import { HistorialClinico } from './historial-clinico.model';
import { Medicamento } from './medicamento.model';

/**
 * Representa la cabecera de una receta médica.
 * Contiene una lista de detalles (RecetaDetalle).
 */
// export interface Receta {
//   idReceta: number;
//   costoConsulta: number;
//   fecha: string; // Formato "YYYY-MM-DD" o "YYYY-MM-DD'T'HH:mm:ss"
//   doctor: Doctor;
//   paciente: Paciente;
//   recetaDetalles: RecetaDetalle[];
//   historialClinico: HistorialClinico;
//   medicametos: Medicamento[];
// }

export interface Receta {
  idReceta: number;
  costoConsulta: number;
  fecha: string; // Formato "YYYY-MM-DD" o "YYYY-MM-DD'T'HH:mm:ss"
  doctor: DoctorReceta;
  paciente: PacienteReceta;
  recetaDetalles: RecetaDetalle[];
  historialClinico: HistorialClinico;
  medicametos: Medicamento[];
}


/**
 * Payload para crear una nueva receta, usando solo los IDs.
 */
export interface RecetaCreatePayload {
  costoConsulta: number;
  fecha: string; // "YYYY-MM-DD"
  doctorId: number;
  pacienteId: number;
}
