import { Usuario } from './usuario.model';

/**
 * Representa a un paciente y su información médica básica.
 * Contiene un objeto Usuario anidado.
 */
export interface Paciente {
  id: number;
  curp: string;
  fechaNacimiento: string; // Formato "YYYY-MM-DD"
  tipoSangre: string;
  alergias: string;
  usuario: Usuario;
}