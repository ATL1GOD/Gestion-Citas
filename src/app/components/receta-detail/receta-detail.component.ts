import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  styleUrl: './receta-detail.component.css'
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
      medicamento: [null, Validators.required],
      dosis: ['', Validators.required],
      indicaciones: ['', Validators.required]
    });

    this.cargarReceta();
    this.cargarCatalogoMedicamentos();
  }

  cargarReceta(): void {
    this.recetaService.getById(this.recetaId).subscribe({
      next: data => this.receta = data,
      error: err => this.error = "No se pudo cargar la receta."
    });
  }

  cargarCatalogoMedicamentos(): void {
    this.medicamentoService.getAll().subscribe(data => this.medicamentosCatalogo = data);
  }

  agregarMedicamento(): void {
    if (this.addMedicamentoForm.invalid) {
      this.addMedicamentoForm.markAllAsTouched();
      return;
    }
    
    const formValue = this.addMedicamentoForm.value;
    const nuevoDetalle: Partial<RecetaDetalle> = {
      receta: { id: this.recetaId } as Receta,
      medicamento: formValue.medicamento,
      dosis: formValue.dosis,
      indicaciones: formValue.indicaciones
    };

    this.recetaService.addDetalle(nuevoDetalle as RecetaDetalle).subscribe({
      next: () => {
        this.cargarReceta(); // Recargar los detalles de la receta
        this.addMedicamentoForm.reset();
      },
      error: err => this.error = "Error al añadir el medicamento."
    });
  }

  eliminarDetalle(idDetalle: number): void {
    if (confirm('¿Quitar este medicamento de la receta?')) {
      this.recetaService.removeDetalle(idDetalle).subscribe({
        next: () => this.cargarReceta(),
        error: err => this.error = "Error al quitar el medicamento."
      });
    }
  }
}