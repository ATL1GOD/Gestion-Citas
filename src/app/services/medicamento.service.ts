import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento } from '../models/medicamento.model'; // Asegúrate de tener este modelo

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private apiUrl = '/api/medicamentos'; // URL base del MedicamentoController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los medicamentos.
   * Corresponde a: @GetMapping en MedicamentoController
   */
  getAll(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.apiUrl);
  }

  /**
   * Obtiene un medicamento por su ID.
   * Corresponde a: @GetMapping("/{id}") en MedicamentoController
   */
  getById(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.apiUrl}/${id}`);
  }

  /**
   * Busca medicamentos por nombre.
   * Corresponde a: @GetMapping("/search") en MedicamentoController
   */
  searchByName(nombre: string): Observable<Medicamento[]> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Medicamento[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Crea un nuevo medicamento.
   * Corresponde a: @PostMapping en MedicamentoController
   */
  create(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.apiUrl, medicamento);
  }

  /**
   * Actualiza un medicamento existente.
   * Corresponde a: @PutMapping("/{id}") en MedicamentoController
   */
  update(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.apiUrl}/${id}`, medicamento);
  }

  /**
   * Elimina un medicamento por su ID.
   * Corresponde a: @DeleteMapping("/{id}") en MedicamentoController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}