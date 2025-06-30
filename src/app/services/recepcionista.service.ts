import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recepcionista } from '../models/recepcionista.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

// Payload para la creación, ya que el backend espera un objeto aplanado.
export interface RecepcionistaCreatePayload {
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  email: string;
  contrasena: string;
  telefono: string;
  horarioId: number;
  consultorioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecepcionistaService {

  private apiUrl = `${environment.apiUrl}/api/recepcionistas`; // URL base del RecepcionistaController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los recepcionistas.
   * Corresponde a: @GetMapping en RecepcionistaController
   */
  getAll(): Observable<Recepcionista[]> {
    return this.http.get<Recepcionista[]>(this.apiUrl);
  }

  /**
   * Obtiene un recepcionista por su ID.
   * Corresponde a: @GetMapping("/{idRecepcionista}") en RecepcionistaController
   */
  getById(id: number): Observable<Recepcionista> {
    return this.http.get<Recepcionista>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo recepcionista.
   * Corresponde a: @PostMapping en RecepcionistaController
   */
  create(payload: RecepcionistaCreatePayload): Observable<Recepcionista> {
    return this.http.post<Recepcionista>(this.apiUrl, payload);
  }

  /**
   * Actualiza un recepcionista existente. El backend espera un Map,
   * por lo que enviamos un objeto con los campos a actualizar.
   * Corresponde a: @PutMapping("/{idRecepcionista}") en RecepcionistaController
   */
  update(id: number, updates: any): Observable<Recepcionista> {
    return this.http.put<Recepcionista>(`${this.apiUrl}/${id}`, updates);
  }

  /**
   * Elimina un recepcionista por su ID.
   * Corresponde a: @DeleteMapping("/{idRecepcionista}") en RecepcionistaController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}