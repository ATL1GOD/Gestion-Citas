import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorConsultorio } from '../../models/doctor-consultorio.model';
import { DoctorConsultorioService } from '../../services/doctor-consultorio.service';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { Consultorio } from '../../models/consultorio.model';
import { ConsultorioService } from '../../services/consultorio.service';
import { Horario } from '../../models/horario.model';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-asignacion-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './asignacion-list.component.html',
  styleUrl: './asignacion-list.component.css',
})
export class AsignacionListComponent implements OnInit {
  asignaciones: DoctorConsultorio[] = [];
  doctores: Doctor[] = [];
  consultorios: Consultorio[] = [];
  horarios: Horario[] = [];
  error: string | null = null;

  constructor(
    private asignacionService: DoctorConsultorioService,
    private doctorService: DoctorService,
    private consultorioService: ConsultorioService,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.cargarAsignaciones();
    this.cargarDoctores();
    this.cargarConsultorios();
    this.cargarHorarios();
  }

  cargarAsignaciones(): void {
    this.asignacionService.getAll().subscribe({
      next: (data) => {
        this.asignaciones = data;
        this.error = null;
      },
      error: (err) => (this.error = 'No se pudieron cargar las asignaciones.'),
    });
  }

  cargarDoctores(): void {
    this.doctorService.getAll().subscribe({
      next: (data) => {
        this.doctores = data;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los doctores.';
        console.error(err);
      }
    });
  }

  cargarConsultorios(): void {
    this.consultorioService.getAll().subscribe({
      next: (data) => {
        this.consultorios = data;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los consultorios.';
        console.error(err);
      }
    });
  }

  cargarHorarios(): void {
    this.horarioService.getAll().subscribe({
      next: (data) => {
        this.horarios = data;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los horarios.';
        console.error(err);
      }
    });
  }

  formatearHora(hora: string | undefined): string {
    if (!hora) return '';
    const [h, m, s] = hora.split(':');
    let hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${m} ${ampm}`;
  }

  obtenerHorarioRango(idHorario: number): string {
    const horario = this.horarios.find(h => h.idHorario === idHorario);
    if (horario && horario.horaInicio && horario.horaFin) {
      return `${this.formatearHora(horario.horaInicio)} - ${this.formatearHora(horario.horaFin)}`;
    }
    return '';
  }

  obtenerNombreDoctor(idDoctor: number): string {
    const doctor = this.doctores.find((d: Doctor) => d.idDoctor === idDoctor);
    if (doctor && doctor.usuario) {
      return `${doctor.usuario.nombre} ${doctor.usuario.apellidoPat} ${doctor.usuario.apellidoMat}`;
    }
    return '';
  }

  obtenerEspecialidadDoctor(idDoctor: number): string {
    const doctor = this.doctores.find((d: Doctor) => d.idDoctor === idDoctor);
    if (doctor && doctor.especialidad) {
      return doctor.especialidad.nombre;
    }
    return '';
  }

  obtenerNumeroConsultorio(idConsultorio: number): string {
    const consultorio = this.consultorios.find(c => c.idConsultorio === idConsultorio);
    return consultorio ? consultorio.numero : '';
  }

  eliminarAsignacion(asignacion: DoctorConsultorio): void {
    const { idDoctor, idConsultorio, idHorario } = asignacion;
    if (confirm(`¿Seguro que desea eliminar la asignación del Doctor con ID ${asignacion.idDoctor} al consultorio con ID ${asignacion.idConsultorio}?`)) {
      this.asignacionService.delete(asignacion.idDoctor, asignacion.idConsultorio, asignacion.idHorario).subscribe({
        next: () => this.cargarAsignaciones(),
        error: (err) => this.error = 'Error al eliminar la asignación.'
      });
    }
  }
}
