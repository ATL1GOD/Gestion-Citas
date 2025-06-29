import { Doctor } from './doctor.model';
import { Paciente } from './paciente.model';
import { RecetaDetalle } from './receta-detalle.model';

/**
 * Representa la cabecera de una receta médica.
 * Contiene una lista de detalles (RecetaDetalle).
 */
export interface Receta {
  id: number;
  costoConsulta: number;
  fecha: string; // Formato "YYYY-MM-DD" o "YYYY-MM-DD'T'HH:mm:ss"
  doctor: Doctor;
  paciente: Paciente;
  recetaDetalles: RecetaDetalle[];
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