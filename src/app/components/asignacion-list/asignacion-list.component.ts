import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorConsultorio } from '../../models/doctor-consultorio.model';
import { DoctorConsultorioService } from '../../services/doctor-consultorio.service';

@Component({
  selector: 'app-asignacion-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './asignacion-list.component.html',
  styleUrl: './asignacion-list.component.css',
})
export class AsignacionListComponent implements OnInit {
  asignaciones: DoctorConsultorio[] = [];
  error: string | null = null;

  constructor(private asignacionService: DoctorConsultorioService) {}

  ngOnInit(): void {
    this.cargarAsignaciones();
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

  eliminarAsignacion(asignacion: DoctorConsultorio): void {
    const { doctor, consultorio, horario } = asignacion;
    if (confirm(`¿Seguro que desea eliminar la asignación del Dr. ${doctor.usuario.apellidoPat} al consultorio ${consultorio.numero}?`)) {
      this.asignacionService.delete(doctor.idDoctor, consultorio.idConsultorio, horario.idHorario).subscribe({
        next: () => this.cargarAsignaciones(),
        error: (err) => this.error = 'Error al eliminar la asignación.'
      });
    }
  }
}
