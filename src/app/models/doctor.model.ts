import { Especialidad } from './especialidad.model';
import { Usuario } from './usuario.model';

/**
 * Representa a un doctor, con su información de usuario y su especialidad.
 * Se ha corregido la propiedad 'noCedula'.
 * Archivo de origen: DoctorController.java
 */
export interface Doctor {
  idDoctor: number;
  noCedula: string;
  usuario: Usuario;
  especialidad: Especialidad;
}
