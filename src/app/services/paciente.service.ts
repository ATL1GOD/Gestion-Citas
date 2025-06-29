import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model'; // Asegúrate de tener este modelo

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = '/api/pacientes'; // URL base del PacienteController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los pacientes.
   * Corresponde a: @GetMapping("/") en PacienteController
   */
  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/`);
  }

  /**
   * Obtiene un paciente por su ID.
   * Corresponde a: @GetMapping("/{id}") en PacienteController
   */
  getById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  /**
   * Busca un paciente por su CURP.
   * Corresponde a: @GetMapping("/curp/{curp}") en PacienteController
   */
  getByCurp(curp: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/curp/${curp}`);
  }

  /**
   * Crea un nuevo paciente. El backend se encarga de enviar el email de bienvenida.
   * Corresponde a: @PostMapping en PacienteController
   */
  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  /**
   * Actualiza los datos de un paciente existente.
   * Corresponde a: @PutMapping("/{id}") en PacienteController
   */
  update(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente);
  }

  /**
   * Elimina un paciente por su ID.
   * Corresponde a: @DeleteMapping("/{id}") en PacienteController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}