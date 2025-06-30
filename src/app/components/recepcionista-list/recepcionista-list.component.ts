import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recepcionista } from '../../models/recepcionista.model';
import { RecepcionistaService } from '../../services/recepcionista.service';

@Component({
  selector: 'app-recepcionista-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recepcionista-list.component.html',
  styleUrl: './recepcionista-list.component.css'
})
export class RecepcionistaListComponent implements OnInit {

  recepcionistas: Recepcionista[] = [];
  error: string | null = null;

  constructor(private recepcionistaService: RecepcionistaService) { }

  ngOnInit(): void {
    this.cargarRecepcionistas();
  }

  cargarRecepcionistas(): void {
    this.recepcionistaService.getAll().subscribe({
      next: (data) => {
        this.recepcionistas = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los recepcionistas.';
        console.error(err);
      }
    });
  }

  eliminarRecepcionista(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este recepcionista?')) {
      this.recepcionistaService.delete(id).subscribe({
        next: () => this.cargarRecepcionistas(),
        error: (err) => {
          this.error = 'Error al eliminar el recepcionista.';
          console.error(err);
        }
      });
    }
  }
}