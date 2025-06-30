import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../models/doctor.model';
import { Consultorio } from '../../models/consultorio.model';
import { Horario } from '../../models/horario.model';
import { DoctorService } from '../../services/doctor.service';
import { ConsultorioService } from '../../services/consultorio.service';
import { HorarioService } from '../../services/horario.service';
import { DoctorConsultorioService } from '../../services/doctor-consultorio.service';

@Component({
  selector: 'app-asignacion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './asignacion-form.component.html',
  styleUrl: './asignacion-form.component.css'
})
export class AsignacionFormComponent implements OnInit {

  asignacionForm!: FormGroup;
  doctores: Doctor[] = [];
  consultorios: Consultorio[] = [];
  horarios: Horario[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorService,
    private consultorioService: ConsultorioService,
    private horarioService: HorarioService,
    private asignacionService: DoctorConsultorioService
  ) {}

  ngOnInit(): void {
    this.asignacionForm = this.fb.group({
      doctorId: [null, Validators.required],
      consultorioId: [null, Validators.required],
      horarioId: [null, Validators.required],
    });
    this.cargarDatosParaSelects();
  }

  cargarDatosParaSelects(): void {
    this.doctorService.getAll().subscribe(data => this.doctores = data);
    this.consultorioService.getAll().subscribe(data => this.consultorios = data);
    // Filtramos para obtener solo horarios de tipo "rango"
    this.horarioService.getAll().subscribe(data => {
      this.horarios = data.filter(h => h.horaInicio && h.horaFin);
    });
  }

  onSubmit(): void {
    if (this.asignacionForm.invalid) {
      this.asignacionForm.markAllAsTouched();
      return;
    }
    
    this.asignacionService.create(this.asignacionForm.value).subscribe({
      next: () => this.router.navigate(['/admin/asignaciones']),
      error: (err) => this.error = 'Error al crear la asignación. Verifique que no exista previamente.'
    });
  }
}