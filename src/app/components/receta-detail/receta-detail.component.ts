// src/app/components/receta-detail/receta-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Receta } from '../../models/receta.model';
import { RecetaService } from '../../services/receta.service';
import { Medicamento } from '../../models/medicamento.model';
import { MedicamentoService } from '../../services/medicamento.service';
import { RecetaDetalle } from '../../models/receta-detalle.model';

@Component({
  selector: 'app-receta-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './receta-detail.component.html',
  styleUrl: './receta-detail.component.css',
})
export class RecetaDetailComponent implements OnInit {
  receta: Receta | null = null;
  addMedicamentoForm!: FormGroup;
  medicamentosCatalogo: Medicamento[] = [];
  recetaId!: number;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recetaService: RecetaService,
    private medicamentoService: MedicamentoService
  ) {}

  ngOnInit(): void {
    this.recetaId = +this.route.snapshot.paramMap.get('id')!;

    this.addMedicamentoForm = this.fb.group({
      // El valor del medicamento será el objeto Medicamento completo gracias a [ngValue]
      medicamento: [null, Validators.required],
      dosis: ['', Validators.required],
      indicaciones: ['', Validators.required],
    });

    this.cargarReceta();
    this.cargarCatalogoMedicamentos();
  }

  cargarReceta(): void {
    this.recetaService.getById(this.recetaId).subscribe({
      next: (data) => (this.receta = data),
      error: (err) => (this.error = 'No se pudo cargar la receta.'),
    });
  }

  cargarCatalogoMedicamentos(): void {
    this.medicamentoService
      .getAll()
      .subscribe((data) => (this.medicamentosCatalogo = data));
  }

  agregarMedicamento(): void {
    if (this.addMedicamentoForm.invalid) {
      this.addMedicamentoForm.markAllAsTouched();
      return;
    }

    const formValue = this.addMedicamentoForm.value;

    // *** INICIO DE LA CORRECCIÓN ***
    // Construir el payload EXACTAMENTE como lo espera el backend.
    const nuevoDetallePayload = {
      dosificacion: formValue.dosis,
      instrucciones: formValue.indicaciones,
      cantidad: 1, // Se añade el campo 'cantidad' que faltaba. Lo ponemos en 1 por defecto.
      receta: { idReceta: this.recetaId }, // Objeto anidado para la receta
      medicamento: { idMedicamento: formValue.medicamento.idMedicamento }, // Objeto anidado para el medicamento
    };
    // *** FIN DE LA CORRECCIÓN ***

    this.recetaService.addDetalle(nuevoDetallePayload).subscribe({
      next: () => {
        this.cargarReceta(); // Recargar los detalles de la receta para ver el nuevo item
        this.addMedicamentoForm.reset();
        this.error = null; // Limpiar errores previos
      },
      error: (_err) =>
        (this.error =
          'Error al añadir el medicamento. Verifique los datos e intente de nuevo.'),
    });
  }

  eliminarDetalle(idDetalle: number): void {
    if (confirm('¿Quitar este medicamento de la receta?')) {
      this.recetaService.removeDetalle(idDetalle).subscribe({
        next: () => this.cargarReceta(),
        error: (err) => (this.error = 'Error al quitar el medicamento.'),
      });
    }
  }
}
