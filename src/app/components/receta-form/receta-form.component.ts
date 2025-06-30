import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  RecetaService,
  RecetaCreatePayload,
} from '../../services/receta.service';
import { PacienteService } from '../../services/paciente.service';
import { DoctorService } from '../../services/doctor.service';
import { Paciente } from '../../models/paciente.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-receta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './receta-form.component.html',
  styleUrl: './receta-form.component.css',
})
export class RecetaFormComponent implements OnInit {
  recetaForm!: FormGroup;
  pacientes: Paciente[] = [];
  doctores: Doctor[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recetaService: RecetaService,
    private pacienteService: PacienteService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.recetaForm = this.fb.group({
      pacienteId: [null, Validators.required],
      doctorId: [null, Validators.required],
      costoConsulta: [0, [Validators.required, Validators.min(0)]],
      fecha: [new Date().toISOString().substring(0, 10), Validators.required], // Fecha de hoy por defecto
    });
    this.cargarSelects();
  }

  cargarSelects(): void {
    this.pacienteService.getAll().subscribe((data) => (this.pacientes = data));
    this.doctorService.getAll().subscribe((data) => (this.doctores = data));
  }

  onSubmit(): void {
    if (this.recetaForm.invalid) {
      this.recetaForm.markAllAsTouched();
      return;
    }

    const payload: RecetaCreatePayload = this.recetaForm.value;

    this.recetaService.create(payload).subscribe({
      next: (nuevaReceta) => {
        // Al crear la receta, redirigimos inmediatamente a la página de detalles
        // para añadir los medicamentos.
        this.router.navigate([
          '/consultas/recetas/detalles',
          nuevaReceta.idReceta,
        ]);
      },
      error: (err) => (this.error = 'Error al crear la cabecera de la receta.'),
    });
  }
}
