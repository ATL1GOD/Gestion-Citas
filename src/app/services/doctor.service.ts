import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model'; // Asegúrate de tener el modelo 'doctor.model.ts'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = `${environment.apiUrl}/doctores`; // URL base del DoctorController

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los doctores.
   * Corresponde a: @GetMapping("/") en DoctorController
   */
  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/`);
  }

  /**
   * Obtiene un doctor por su ID.
   * Corresponde a: @GetMapping("/{id}") en DoctorController
   */
  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  /**
   * Busca doctores por el nombre de su especialidad.
   * Corresponde a: @GetMapping("/especialidad/{especialidad}") en DoctorController
   */
  getByEspecialidad(nombreEspecialidad: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/especialidad/${nombreEspecialidad}`);
  }

  /**
   * Busca un doctor por su número de cédula.
   * Corresponde a: @GetMapping("/cedula/{noCedula}") en DoctorController
   */
  getByCedula(noCedula: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/cedula/${noCedula}`);
  }

  /**
   * Crea un nuevo doctor. El backend asocia la especialidad y envía el email de bienvenida.
   * Corresponde a: @PostMapping en DoctorController
   */
  create(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, doctor);
  }

  /**
   * Actualiza los datos de un doctor existente.
   * Corresponde a: @PutMapping("/{id}") en DoctorController
   */
  update(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor);
  }

  /**
   * Elimina un doctor por su ID.
   * Corresponde a: @DeleteMapping("/{id}") en DoctorController
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}