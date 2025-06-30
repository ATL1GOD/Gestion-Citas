import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorConsultorio } from '../models/doctor-consultorio.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

export interface DoctorConsultorioCreatePayload {
  doctorId: number;
  consultorioId: number;
  horarioId: number;
}

export interface DoctorConsultorioUpdatePayload {
  oldDoctorId: number;
  oldConsultorioId: number;
  oldHorarioId: number;
  newDoctorId: number;
  newConsultorioId: number;
  newHorarioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorConsultorioService {

  private apiUrl = `${environment.apiUrl}/api/asignaciones`; // URL base del DoctorConsultorioController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las asignaciones de doctores a consultorios.
   * Corresponde a: @GetMapping("/") en DoctorConsultorioController
   */
  getAll(): Observable<DoctorConsultorio[]> {
    return this.http.get<DoctorConsultorio[]>(`${this.apiUrl}/`);
  }

  /**
   * Crea una nueva asignación.
   * Corresponde a: @PostMapping en DoctorConsultorioController
   */
  create(payload: DoctorConsultorioCreatePayload): Observable<DoctorConsultorio> {
    return this.http.post<DoctorConsultorio>(this.apiUrl, payload);
  }

  /**
   * Actualiza una asignación existente.
   * La asignación original se identifica por parámetros en la URL, y la nueva información va en el cuerpo.
   * Corresponde a: @PutMapping en DoctorConsultorioController
   */
  update(payload: DoctorConsultorioUpdatePayload): Observable<DoctorConsultorio> {
    const params = new HttpParams()
      .set('oldDoctorId', payload.oldDoctorId.toString())
      .set('oldConsultorioId', payload.oldConsultorioId.toString())
      .set('oldHorarioId', payload.oldHorarioId.toString());

    const body = {
      doctorId: payload.newDoctorId,
      consultorioId: payload.newConsultorioId,
      horarioId: payload.newHorarioId
    };

    return this.http.put<DoctorConsultorio>(this.apiUrl, body, { params });
  }

  /**
   * Elimina una asignación. La asignación se identifica por parámetros en la URL.
   * Corresponde a: @DeleteMapping en DoctorConsultorioController
   */
  delete(doctorId: number, consultorioId: number, horarioId: number): Observable<void> {
    const params = new HttpParams()
      .set('doctorId', doctorId.toString())
      .set('consultorioId', consultorioId.toString())
      .set('horarioId', horarioId.toString());

    return this.http.delete<void>(this.apiUrl, { params });
  }
}