import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultorio } from '../models/consultorio.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

  private apiUrl = `${environment.apiUrl}/api/consultorios`; // URL base del ConsultorioController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los consultorios.
   * Corresponde a: @GetMapping("/") en ConsultorioController
   */
  getAll(): Observable<Consultorio[]> {
    return this.http.get<Consultorio[]>(`${this.apiUrl}/`);
  }

  /**
   * Obtiene un consultorio por su ID.
   * Corresponde a: @GetMapping("/{id}") en ConsultorioController
   */
  getById(id: number): Observable<Consultorio> {
    return this.http.get<Consultorio>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo consultorio.
   * Corresponde a: @PostMapping("/") en ConsultorioController
   */
  create(consultorio: Consultorio): Observable<Consultorio> {
    return this.http.post<Consultorio>(`${this.apiUrl}/`, consultorio);
  }

  /**
   * Actualiza un consultorio existente.
   * Corresponde a: @PutMapping("/{id}") en ConsultorioController
   */
  update(id: number, consultorio: Consultorio): Observable<Consultorio> {
    return this.http.put<Consultorio>(`${this.apiUrl}/${id}`, consultorio);
  }

  /**
   * Elimina un consultorio por su ID.
   * Corresponde a: @DeleteMapping("/{id}") en ConsultorioController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}