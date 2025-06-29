import { Estatus } from './estatus.model';

/**
 * Representa un consultorio físico del hospital.
 * Contiene una relación con Estatus para saber si está disponible, en mantenimiento, etc.
 * Archivo de origen: ConsultorioController.java
 */
export interface Consultorio {
  id: number;
  numero: string;
  piso: string;
  descripcion: string;
  estatus: Estatus;
}