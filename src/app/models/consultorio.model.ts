import { Estatus } from './estatus.model';
import { CitaConsulta} from './cita-consulta.model';
import { Recepcionista } from './recepcionista.model';

/**
 * Representa un consultorio físico del hospital.
 * Contiene una relación con Estatus para saber si está disponible, en mantenimiento, etc.
 * Archivo de origen: ConsultorioController.java
 */
export interface Consultorio {
  idConsultorio: number;
  numero: string;
  piso: string;
  citas: CitaConsulta; // Número de citas asignadas a este consultorio
  recepcionistas: Recepcionista; // Número de recepcionistas asignados a este consultorio
  descripcion: string;
  estatus: Estatus;
}
