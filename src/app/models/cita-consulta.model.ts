import { Consultorio } from './consultorio.model';
import { Doctor } from './doctor.model';
import { Especialidad } from './especialidad.model';
import { Estatus } from './estatus.model';
import { Paciente } from '../models/paciente.model'; // Asumiendo que tienes este modelo.

/**
 * Representa una cita médica completa con todas sus relaciones.
 * El backend usa un Map para las respuestas GET, pero para crear y actualizar,
 * esta estructura anidada es la más útil en el frontend.
 * Archivo de origen: CitaConsultaController.java
 */
export interface CitaConsulta {
  idCita:     number;
  fecha:      string;       // "YYYY-MM-DD"
  hora:       [number,number]; // [hora, minuto]
  motivo:     string;
  doctor:     {
    nombre:       string;
    apellido:     string;
    noCedula:     string;
    especialidad: string;
  };
  paciente:   {
    curp:         string;
    nombre:       string;
    apellidoPat:  string;
    apellidoMat:  string;
  };
  estatus:    string;
  consultorio:string;
}

/**
 * Payload para crear una nueva cita, usando solo los IDs.
 * Esto coincide con el método `crearCita` que recibe un Map.
 * Archivo de origen: CitaConsultaController.java
 */
export interface CitaConsultaCreatePayload {
  fecha: string;      // "YYYY-MM-DD"
  hora: string;       // "HH:mm"
  motivo: string;
  pacienteId: number;
  doctorId: number;
  consultorioId: number;
  especialidadId: number;
  estatusId: number;
}