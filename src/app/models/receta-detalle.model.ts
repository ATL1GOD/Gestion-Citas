import { Medicamento } from './medicamento.model';

/**
 * Representa una línea o item dentro de una receta médica.
 * Indica qué medicamento, en qué dosis y con qué indicaciones.
 */
export interface RecetaDetalle {
  id: number;
  dosis: string;
  indicaciones: string;
  medicamento: Medicamento;
}