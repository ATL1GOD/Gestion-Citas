import { Consultorio } from './consultorio.model';
import { Horario } from './horario.model';
import { Usuario } from './usuario.model';

/**
 * Representa a un recepcionista y sus asignaciones.
 * Contiene objetos anidados de Usuario, Horario y Consultorio.
 */
export interface Recepcionista {
  idRecepcionista: number;
  usuario: Usuario;
  horario: Horario;
  consultorio: Consultorio;
}
