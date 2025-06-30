// src/app/models/receta-detalle.model.ts

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
  receta: Receta; // Cambiado para reflejar el objeto completo
  dosificacion: string;
  // El backend devuelve el nombre del medicamento como string en la consulta de receta.
  // Dejamos esto como estaba, pero el payload de creación será diferente.
  medicamento: String;
  instrucciones: String;
  cantidad: number;
  fechaReceta: Date;
}
