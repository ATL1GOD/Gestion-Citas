// src/app/services/receta.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta.model'; // Asegúrate de tener este modelo
import { RecetaDetalle } from '../models/receta-detalle.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

// Payload para la creación de la cabecera de la receta
export interface RecetaCreatePayload {
  costoConsulta: number;
  fecha: string; // "YYYY-MM-DD"
  doctorId: number;
  pacienteId: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private recetaApiUrl = `${environment.apiUrl}/recetas`;
  private detalleApiUrl = `${environment.apiUrl}/recetas-detalle`;

  constructor(private http: HttpClient) {}

  // --- Métodos para Receta (Cabecera) ---

  getAll(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.recetaApiUrl);
  }

  getById(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.recetaApiUrl}/${id}`);
  }

  getByPacienteId(idPaciente: number): Observable<Receta[]> {
    return this.http.get<Receta[]>(
      `${this.recetaApiUrl}/paciente/${idPaciente}`
    );
  }

  getByDoctorId(idDoctor: number): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.recetaApiUrl}/doctor/${idDoctor}`);
  }

  create(payload: RecetaCreatePayload): Observable<Receta> {
    return this.http.post<Receta>(this.recetaApiUrl, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.recetaApiUrl}/${id}`);
  }

  // --- Métodos para RecetaDetalle ---

  getDetallesByRecetaId(idReceta: number): Observable<RecetaDetalle[]> {
    return this.http.get<RecetaDetalle[]>(
      `${this.detalleApiUrl}/receta/${idReceta}`
    );
  }

  /**
   * Se ha cambiado el tipo de 'detalle' a 'any' para permitir un payload de creación
   * que no coincide exactamente con el modelo RecetaDetalle.
   */
  addDetalle(detalle: any): Observable<RecetaDetalle> {
    return this.http.post<RecetaDetalle>(this.detalleApiUrl, detalle);
  }

  removeDetalle(idRecetaDetalle: number): Observable<void> {
    return this.http.delete<void>(`${this.detalleApiUrl}/${idRecetaDetalle}`);
  }
}
