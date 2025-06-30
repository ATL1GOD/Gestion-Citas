import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model'; // Asegúrate de tener este modelo
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.apiUrl}/usuarios`; // URL base del UsuarioController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los usuarios.
   * Corresponde a: @GetMapping en UsuarioController
   */
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  /**
   * Obtiene un usuario por su ID.
   * Corresponde a: @GetMapping("/{id}") en UsuarioController
   */
  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo usuario.
   * Corresponde a: @PostMapping en UsuarioController
   */
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  /**
   * Actualiza un usuario existente. La contraseña es opcional.
   * Corresponde a: @PutMapping("/{id}") en UsuarioController
   */
  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  /**
   * Elimina un usuario por su ID.
   * Corresponde a: @DeleteMapping("/{id}") en UsuarioController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}