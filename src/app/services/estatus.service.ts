import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estatus } from '../models/estatus.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {

  private apiUrl = `${environment.apiUrl}/api/estatus`; // URL base del EstatusController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los estatus.
   * Corresponde a: @GetMapping("/") en EstatusController
   */
  getAll(): Observable<Estatus[]> {
    return this.http.get<Estatus[]>(`${this.apiUrl}/`);
  }

  /**
   * Obtiene un estatus por su ID.
   * Corresponde a: @GetMapping("/{id}") en EstatusController
   */
  getById(id: number): Observable<Estatus> {
    return this.http.get<Estatus>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo estatus.
   * Corresponde a: @PostMapping en EstatusController
   */
  create(estatus: Estatus): Observable<Estatus> {
    return this.http.post<Estatus>(this.apiUrl, estatus);
  }

  /**
   * Actualiza un estatus existente.
   * Corresponde a: @PutMapping("/{id}") en EstatusController
   */
  update(id: number, estatus: Estatus): Observable<Estatus> {
    return this.http.put<Estatus>(`${this.apiUrl}/${id}`, estatus);
  }

  /**
   * Elimina un estatus por su ID.
   * Corresponde a: @DeleteMapping("/{id}") en EstatusController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}