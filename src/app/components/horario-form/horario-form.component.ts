import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-horario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './horario-form.component.html',
  styleUrl: './horario-form.component.css'
})
export class HorarioFormComponent implements OnInit {
  
  horarioForm!: FormGroup;
  tipoHorario = 'unico'; // 'unico' o 'rango'
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.horarioForm = this.fb.group({
      horario: [null],
      horaInicio: [null],
      horaFin: [null]
    });
    this.actualizarValidadores();
  }

  actualizarValidadores(): void {
    const horarioCtrl = this.horarioForm.get('horario');
    const horaInicioCtrl = this.horarioForm.get('horaInicio');
    const horaFinCtrl = this.horarioForm.get('horaFin');

    // Limpiar validadores y valores
    horarioCtrl?.clearValidators();
    horaInicioCtrl?.clearValidators();
    horaFinCtrl?.clearValidators();
    horarioCtrl?.setValue(null);
    horaInicioCtrl?.setValue(null);
    horaFinCtrl?.setValue(null);
    
    // Aplicar validadores según el tipo seleccionado
    if (this.tipoHorario === 'unico') {
      horarioCtrl?.setValidators([Validators.required]);
    } else {
      horaInicioCtrl?.setValidators([Validators.required]);
      horaFinCtrl?.setValidators([Validators.required]);
    }

    // Actualizar el estado del formulario
    horarioCtrl?.updateValueAndValidity();
    horaInicioCtrl?.updateValueAndValidity();
    horaFinCtrl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.horarioForm.invalid) {
      this.horarioForm.markAllAsTouched();
      return;
    }
    
    this.horarioService.create(this.horarioForm.value).subscribe({
      next: () => this.router.navigate(['/admin/horarios']),
      error: (err) => this.error = 'Error al crear el horario.'
    });
  }
}