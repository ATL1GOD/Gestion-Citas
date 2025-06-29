import { CitaConsulta } from './cita-consulta.model';
import { Doctor } from './doctor.model';
import { Paciente } from './paciente.model';
import { Receta } from './receta.model';

/**
 * Representa un registro en el historial clínico de un paciente.
 * Es una de las entidades más complejas, relacionando varias partes del sistema.
 */
export interface HistorialClinico {
  id: number;
  diagnostico: string;
  tratamiento: string;
  notas: string;
  fechaDiagnostico: string; // Formato "YYYY-MM-DD"
  fechaAlta?: string;       // Opcional
  paciente: Paciente;
  doctor: Doctor;
  cita: CitaConsulta;
  receta?: Receta;          // Opcional
  archivoAdjuntoPath?: string; // Nombre del archivo, para construir el enlace de descarga
}