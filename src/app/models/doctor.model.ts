import { Especialidad } from './especialidad.model';
import { Usuario } from './usuario.model';
import { CitaConsulta } from './cita-consulta.model';
import { HistorialClinico } from './historial-clinico.model';

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
  citas?: CitaConsulta;
  historiales?: HistorialClinico;
}

export interface DoctorReceta {
  idDoctor: number;
  noCedula: string;
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  especialidad: Especialidad;
}
