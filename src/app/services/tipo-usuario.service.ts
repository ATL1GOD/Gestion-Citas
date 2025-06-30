import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoUsuario } from '../models/tipo-usuario.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  private apiUrl = `${environment.apiUrl}/api/tipousuarios`; // URL base del TipoUsuarioController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los tipos de usuario.
   * Corresponde a: @GetMapping en TipoUsuarioController
   */
  getAll(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>(this.apiUrl);
  }

  /**
   * Obtiene un tipo de usuario por su ID.
   * Corresponde a: @GetMapping("/{id}") en TipoUsuarioController
   */
  getById(id: number): Observable<TipoUsuario> {
    return this.http.get<TipoUsuario>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo tipo de usuario.
   * Corresponde a: @PostMapping en TipoUsuarioController
   */
  create(tipoUsuario: TipoUsuario): Observable<TipoUsuario> {
    return this.http.post<TipoUsuario>(this.apiUrl, tipoUsuario);
  }

  /**
   * Actualiza un tipo de usuario existente.
   * Corresponde a: @PutMapping("/{id}") en TipoUsuarioController
   */
  update(id: number, tipoUsuario: TipoUsuario): Observable<TipoUsuario> {
    return this.http.put<TipoUsuario>(`${this.apiUrl}/${id}`, tipoUsuario);
  }

  /**
   * Elimina un tipo de usuario.
   * Corresponde a: @DeleteMapping("/{id}") en TipoUsuarioController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}