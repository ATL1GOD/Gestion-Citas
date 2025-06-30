/**
 * Representa un medicamento del catálogo del hospital.
 */
import { RecetaDetalle } from './receta-detalle.model';

export interface Medicamento {
  idMedicamento: number;
  nombre: string;
  presentacion: string;
  descripcion: string;
  recetaDetalles: RecetaDetalle;
}