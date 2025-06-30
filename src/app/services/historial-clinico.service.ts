import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialClinico } from '../models/historial-clinico.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

// Payload para la creación, ya que el backend espera un objeto aplanado.
export interface HistorialCreatePayload {
  diagnostico: string;
  tratamiento: string;
  notas: string;
  fechaDiagnostico: string; // "YYYY-MM-DD"
  fechaAlta?: string; // Opcional
  pacienteId: number;
  doctorId: number;
  citaId: number;
  recetaId?: number; // Opcional
}

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {

  private apiUrl = `${environment.apiUrl}/api/historiales`; // URL base del HistorialClinicoController

  constructor(private http: HttpClient) { }

  getAll(): Observable<HistorialClinico[]> {
    return this.http.get<HistorialClinico[]>(this.apiUrl);
  }

  getById(id: number): Observable<HistorialClinico> {
    return this.http.get<HistorialClinico>(`${this.apiUrl}/${id}`);
  }

  getByPacienteId(idPaciente: number): Observable<HistorialClinico[]> {
    return this.http.get<HistorialClinico[]>(`${this.apiUrl}/paciente/${idPaciente}`);
  }

  create(payload: HistorialCreatePayload): Observable<HistorialClinico> {
    return this.http.post<HistorialClinico>(this.apiUrl, payload);
  }

  update(id: number, updates: any): Observable<HistorialClinico> {
    return this.http.put<HistorialClinico>(`${this.apiUrl}/${id}`, updates);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Sube un archivo adjunto para un historial clínico existente.
   * Corresponde a: @PostMapping("/{idHistorial}/uploadFile")
   */
  uploadFile(idHistorial: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${idHistorial}/uploadFile`, formData);
  }

  /**
   * Descarga el archivo adjunto de un historial.
   * Corresponde a: @GetMapping("/{idHistorial}/downloadFile")
   */
  downloadFile(idHistorial: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${idHistorial}/downloadFile`, {
      responseType: 'blob'
    });
  }
}