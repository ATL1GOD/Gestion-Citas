import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {

  doctores: Doctor[] = [];
  error: string | null = null;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.cargarDoctores();
  }

  cargarDoctores(): void {
    this.doctorService.getAll().subscribe({
      next: (data) => {
        this.doctores = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los doctores.';
        console.error(err);
      }
    });
  }

  eliminarDoctor(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este doctor? Esta acción también eliminará su usuario asociado.')) {
      this.doctorService.delete(id).subscribe({
        next: () => this.cargarDoctores(),
        error: (err) => {
          this.error = 'Error al eliminar el doctor.';
          console.error(err);
        }
      });
    }
  }
}