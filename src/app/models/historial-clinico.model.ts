import { CitaConsulta } from './cita-consulta.model';
import { DoctorReceta } from './doctor.model';
import { PacienteReceta } from './paciente.model';
import { Receta } from './receta.model';

/**
 * Representa un registro en el historial clínico de un paciente.
 * Es una de las entidades más complejas, relacionando varias partes del sistema.
 */
export interface HistorialClinico {
  idHistorial: number;
  diagnostico: string;
  tratamiento: string;
  notas: string;
  fechaDiagnostico: string; // Formato "YYYY-MM-DD"
  fechaAlta?: string; // Opcional
  paciente: PacienteReceta;
  doctor: DoctorReceta;
  cita: CitaConsulta;
  receta?: Receta; // Opcional
  archivoAdjuntoData?: String; // Datos del archivo adjunto, si existe
  archivoAdjuntoPath?: Blob; // Nombre del archivo, para construir el enlace de descarga
}
