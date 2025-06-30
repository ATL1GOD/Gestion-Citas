import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private apiUrl = `${environment.apiUrl}/especialidades`; // URL base del EspecialidadController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las especialidades.
   * Corresponde a: @GetMapping("/") en EspecialidadController
   */
  getAll(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.apiUrl}/`);
  }

  /**
   * Obtiene una especialidad por su ID.
   * Corresponde a: @GetMapping("/{id}") en EspecialidadController
   */
  getById(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva especialidad.
   * Corresponde a: @PostMapping("/") en EspecialidadController
   */
  create(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(`${this.apiUrl}/`, especialidad);
  }

  /**
   * Actualiza una especialidad existente.
   * Corresponde a: @PutMapping("/{id}") en EspecialidadController
   */
  update(id: number, especialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.apiUrl}/${id}`, especialidad);
  }

  /**
   * Elimina una especialidad por su ID.
   * Corresponde a: @DeleteMapping("/{id}") en EspecialidadController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}