import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Medicamento } from '../../models/medicamento.model';
import { MedicamentoService } from '../../services/medicamento.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-medicamento-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './medicamento-list.component.html',
  styleUrl: './medicamento-list.component.css'
})
export class MedicamentoListComponent implements OnInit {

  medicamentos: Medicamento[] = [];
  error: string | null = null;
  searchControl = new FormControl('');

  constructor(private medicamentoService: MedicamentoService) { }

  ngOnInit(): void {
    this.cargarMedicamentos();
    
    // Búsqueda en tiempo real
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => term ? this.medicamentoService.searchByName(term) : this.medicamentoService.getAll())
    ).subscribe({
      next: data => this.medicamentos = data,
      error: err => this.error = 'Error durante la búsqueda.'
    });
  }

  cargarMedicamentos(): void {
    this.medicamentoService.getAll().subscribe({
      next: (data) => {
        this.medicamentos = data;
        this.error = null;
      },
      error: (err) => this.error = 'No se pudieron cargar los medicamentos.'
    });
  }

  eliminarMedicamento(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este medicamento del catálogo?')) {
      this.medicamentoService.delete(id).subscribe({
        next: () => this.cargarMedicamentos(),
        error: (err) => this.error = 'Error al eliminar el medicamento.'
      });
    }
  }
}
