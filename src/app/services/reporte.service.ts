import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiUrl = '/api/reportes'; // URL base del ReporteController

  constructor(private http: HttpClient) { }

  /**
   * Descarga un reporte en PDF.
   * @param nombreReporte El nombre del reporte (ej. 'doctores', 'pacientes', 'citas').
   */
  descargarReportePdf(nombreReporte: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${nombreReporte}/pdf`, {
      responseType: 'blob'
    });
  }

  /**
   * Solicita al backend que envíe el historial de un paciente por email.
   * @param idPaciente El ID del paciente.
   */
  enviarHistorialPorEmail(idPaciente: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/historial/paciente/${idPaciente}/enviar-email`, {});
  }
}