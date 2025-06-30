import { Medicamento } from './medicamento.model';
import { Receta } from './receta.model';

/**
 * Representa una línea o item dentro de una receta médica.
 * Indica qué medicamento, en qué dosis y con qué indicaciones.
 */
export interface RecetaDetalle {
  id: number;
  dosis: string;
  indicaciones: string;
  medicamento: Medicamento;
  receta: Receta; // Relación con la receta a la que pertenece este detalle
}