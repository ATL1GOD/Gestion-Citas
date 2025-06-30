import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MedicamentoService } from '../../services/medicamento.service';

@Component({
  selector: 'app-medicamento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './medicamento-form.component.html',
  styleUrl: './medicamento-form.component.css'
})
export class MedicamentoFormComponent implements OnInit {
  
  medicamentoForm!: FormGroup;
  isEditMode = false;
  medicamentoId: number | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private medicamentoService: MedicamentoService
  ) {}

  ngOnInit(): void {
    this.medicamentoForm = this.fb.group({
      nombre: ['', Validators.required],
      presentacion: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.medicamentoId = +id;
      this.cargarDatosMedicamento(this.medicamentoId);
    }
  }

  cargarDatosMedicamento(id: number): void {
    this.medicamentoService.getById(id).subscribe({
      next: (data) => this.medicamentoForm.patchValue(data),
      error: (err) => this.error = "No se pudo cargar el medicamento."
    });
  }

  onSubmit(): void {
    if (this.medicamentoForm.invalid) {
      this.medicamentoForm.markAllAsTouched();
      return;
    }

    const operation = this.isEditMode
      ? this.medicamentoService.update(this.medicamentoId!, this.medicamentoForm.value)
      : this.medicamentoService.create(this.medicamentoForm.value);

    operation.subscribe({
      next: () => this.router.navigate(['/admin/medicamentos']),
      error: (err) => this.error = `Error al ${this.isEditMode ? 'actualizar' : 'guardar'} el medicamento.`
    });
  }
}