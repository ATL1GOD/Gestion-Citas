import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaConsulta } from '../models/cita-consulta.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

// Payload para la creación de una cita, ya que el backend espera un objeto aplanado.
export interface CitaConsultaCreatePayload {
  fecha: string;      // "YYYY-MM-DD"
  hora: string;       // "HH:mm:ss"
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

  private apiUrl = `${environment.apiUrl}/api/citas`; // URL base del CitaConsultaController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las citas.
   * Corresponde a: @GetMapping en CitaConsultaController
   */
  getAll(): Observable<CitaConsulta[]> {
    return this.http.get<CitaConsulta[]>(this.apiUrl);
  }

  /**
   * Obtiene una cita por su ID.
   * Corresponde a: @GetMapping("/{idCita}") en CitaConsultaController
   */
  getById(id: number): Observable<CitaConsulta> {
    return this.http.get<CitaConsulta>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene las citas de un doctor en una fecha específica.
   * Corresponde a: @GetMapping("/doctor/{idDoctor}/fecha/{fecha}") en CitaConsultaController
   */
  getByDoctorAndDate(idDoctor: number, fecha: string): Observable<CitaConsulta[]> {
    return this.http.get<CitaConsulta[]>(`${this.apiUrl}/doctor/${idDoctor}/fecha/${fecha}`);
  }

  /**
   * Obtiene las citas de un paciente en una fecha específica.
   * Corresponde a: @GetMapping("/paciente/{idPaciente}/fecha/{fecha}") en CitaConsultaController
   */
  getByPacienteAndDate(idPaciente: number, fecha: string): Observable<CitaConsulta[]> {
    return this.http.get<CitaConsulta[]>(`${this.apiUrl}/paciente/${idPaciente}/fecha/${fecha}`);
  }

  /**
   * Crea una nueva cita. El backend se encarga de enviar el email de notificación.
   * Corresponde a: @PostMapping en CitaConsultaController
   */
  create(payload: CitaConsultaCreatePayload): Observable<CitaConsulta> {
    return this.http.post<CitaConsulta>(this.apiUrl, payload);
  }

  /**
   * Actualiza una cita existente. El backend espera un Map,
   * por lo que enviamos un objeto con los campos a actualizar.
   * Corresponde a: @PutMapping("/{idCita}") en CitaConsultaController
   */
  update(id: number, updates: any): Observable<CitaConsulta> {
    return this.http.put<CitaConsulta>(`${this.apiUrl}/${id}`, updates);
  }

  /**
   * Elimina una cita por su ID.
   * Corresponde a: @DeleteMapping("/{idCita}") en CitaConsultaController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}