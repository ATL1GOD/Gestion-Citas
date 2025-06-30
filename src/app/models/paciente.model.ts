import { Usuario } from './usuario.model';

/**
 * Representa a un paciente y su información médica básica.
 * Contiene un objeto Usuario anidado.
 */
export interface Paciente {
  idPaciente: number;
  curp: string;
  fechaNacimiento: string; // Formato "YYYY-MM-DD"
  tipoSangre: string;
  alergias: string;
  usuario: Usuario;
}

export interface PacienteReceta {
  idPaciente: number;
  curp: string;
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
}