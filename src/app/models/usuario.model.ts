import { TipoUsuario } from './tipo-usuario.model';

/**
 * Representa la información base de un usuario.
 * Es utilizado por Paciente, Doctor y Recepcionista.
 */
export interface Usuario {
  id: number;
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  email: string;
  telefono: string;
  contrasena?: string; // La contraseña es opcional, no siempre se envía desde el backend.
  tipoUsuario: TipoUsuario;
}