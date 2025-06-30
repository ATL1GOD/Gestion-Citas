import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Consultorio } from '../../models/consultorio.model';
import { ConsultorioService } from '../../services/consultorio.service';

@Component({
  selector: 'app-consultorio-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultorio-list.component.html',
  styleUrl: './consultorio-list.component.css'
})
export class ConsultorioListComponent implements OnInit {

  consultorios: Consultorio[] = [];
  error: string | null = null;

  constructor(private consultorioService: ConsultorioService) { }

  ngOnInit(): void {
    this.cargarConsultorios();
  }

  cargarConsultorios(): void {
    this.consultorioService.getAll().subscribe({
      next: (data) => {
        this.consultorios = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los consultorios.';
        console.error(err);
      }
    });
  }

  eliminarConsultorio(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este consultorio?')) {
      this.consultorioService.delete(id).subscribe({
        next: () => this.cargarConsultorios(),
        error: (err) => {
          this.error = 'Error al eliminar el consultorio.';
          console.error(err);
        }
      });
    }
  }
}