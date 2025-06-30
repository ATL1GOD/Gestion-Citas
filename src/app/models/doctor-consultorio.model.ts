import { Consultorio } from './consultorio.model';
import { Doctor } from './doctor.model';
import { Horario } from './horario.model';

/**
 * Representa la asignación de un doctor a un consultorio en un horario específico.
 * Esta entidad tiene una clave primaria compuesta en el backend.
 * Archivo de origen: DoctorConsultorioController.java
 */
export interface DoctorConsultorio {
  idDoctor: number;
  idConsultorio: number;
  idHorario: number;
}

/**
 * Payload para crear una nueva asignación, usando solo los IDs.
 * Archivo de origen: DoctorConsultorioController.java
 */
export interface DoctorConsultorioCreatePayload {
  doctorId: number;
  consultorioId: number;
  horarioId: number;
}
