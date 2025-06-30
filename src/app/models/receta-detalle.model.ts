import { Medicamento } from './medicamento.model';
import { Receta } from './receta.model';
import { Paciente } from './paciente.model';
import { Doctor } from './doctor.model';
import { HistorialClinico } from './historial-clinico.model';

/**
 * Representa una línea o item dentro de una receta médica.
 * Indica qué medicamento, en qué dosis y con qué indicaciones.
 */
export interface RecetaDetalle {
  idRecetaDetalle: number;
  receta: number; // ID de la receta a la que pertenece este detalle
  dosificacion: string;
  medicamento: String;
  instrucciones: String;
  cantidad: number;
  fechaReceta: Date;
}
