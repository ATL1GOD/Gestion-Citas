/**
 * Representa el rol de un usuario en el sistema (ej. Administrador, Doctor, Paciente).
 * Corresponde a la entidad TipoUsuario.
 */
export interface TipoUsuario {
  id: number;
  nombre: string;
}