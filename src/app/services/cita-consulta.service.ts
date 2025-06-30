// src/app/services/cita-consulta.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaConsulta } from '../models/cita-consulta.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

// Payload para la creación de una cita, ya que el backend espera un objeto aplanado.
export interface CitaConsultaCreatePayload {
  fecha: string;       // "YYYY-MM-DD"
  hora: string;        // "HH:mm:ss"
  motivo: string;
  pacienteId: number;
  doctorId: number;
  consultorioId: number;
  especialidadId: number;
  estatusId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CitaConsultaService {

  // URL base apuntando al controlador de citas en el backend
  private apiUrl = `${environment.apiUrl}/citas`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las citas.
   * GET /api/citas
   */
  getAll(): Observable<CitaConsulta[]> {
    return this.http.get<CitaConsulta[]>(this.apiUrl);
  }

  /**
   * Obtiene una cita por su ID.
   * GET /api/citas/{id}
   */
  getById(id: number): Observable<CitaConsulta> {
    return this.http.get<CitaConsulta>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene las citas de un doctor en una fecha específica.
   * GET /api/citas/doctor/{idDoctor}/fecha/{fecha}
   */
  getByDoctorAndDate(idDoctor: number, fecha: string): Observable<CitaConsulta[]> {
    return this.http.get<CitaConsulta[]>(`${this.apiUrl}/doctor/${idDoctor}/fecha/${fecha}`);
  }

  /**
   * Obtiene las citas de un paciente en una fecha específica.
   * GET /api/citas/paciente/{idPaciente}/fecha/{fecha}
   */
  getByPacienteAndDate(idPaciente: number, fecha: string): Observable<CitaConsulta[]> {
    return this.http.get<CitaConsulta[]>(`${this.apiUrl}/paciente/${idPaciente}/fecha/${fecha}`);
  }

  /**
   * Crea una nueva cita. El backend se encarga de enviar el email de notificación.
   * POST /api/citas
   */
  create(payload: CitaConsultaCreatePayload): Observable<CitaConsulta> {
    return this.http.post<CitaConsulta>(this.apiUrl, payload);
  }

  /**
   * Actualiza una cita existente. El backend espera un Map,
   * por lo que enviamos un objeto con los campos a actualizar.
   * PUT /api/citas/{id}
   */
  update(id: number, updates: Partial<CitaConsultaCreatePayload>): Observable<CitaConsulta> {
    return this.http.put<CitaConsulta>(`${this.apiUrl}/${id}`, updates);
  }

  /**
   * Elimina una cita por su ID.
   * DELETE /api/citas/{id}
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
