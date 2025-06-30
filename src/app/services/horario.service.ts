import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private apiUrl = `${environment.apiUrl}/api/horarios`; // URL base del HorarioController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los horarios.
   * Corresponde a: @GetMapping("/") en HorarioController
   */
  getAll(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/`);
  }

  /**
   * Obtiene un horario por su ID.
   * Corresponde a: @GetMapping("/{id}") en HorarioController
   */
  getById(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo horario.
   * Corresponde a: @PostMapping en HorarioController
   */
  create(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl, horario);
  }

  /**
   * Actualiza un horario existente.
   * Corresponde a: @PutMapping("/{id}") en HorarioController
   */
  update(id: number, horario: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${this.apiUrl}/${id}`, horario);
  }

  /**
   * Elimina un horario por su ID.
   * Corresponde a: @DeleteMapping("/{id}") en HorarioController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}