import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HistorialClinicoService, HistorialCreatePayload } from '../../services/historial-clinico.service';
import { PacienteService } from '../../services/paciente.service';
import { DoctorService } from '../../services/doctor.service';
import { CitaConsultaService } from '../../services/cita-consulta.service';
import { Paciente } from '../../models/paciente.model';
import { Doctor } from '../../models/doctor.model';
import { CitaConsulta } from '../../models/cita-consulta.model';

@Component({
  selector: 'app-historial-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './historial-form.component.html',
  styleUrl: './historial-form.component.css'
})
export class HistorialFormComponent implements OnInit {

  historialForm!: FormGroup;
  pacientes: Paciente[] = [];
  doctores: Doctor[] = [];
  citas: CitaConsulta[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private historialService: HistorialClinicoService,
    private pacienteService: PacienteService,
    private doctorService: DoctorService,
    private citaService: CitaConsultaService
  ) {}

  ngOnInit(): void {
    this.historialForm = this.fb.group({
      pacienteId: [null, Validators.required],
      citaId: [null, Validators.required],
      diagnostico: ['', Validators.required],
      tratamiento: ['', Validators.required],
      notas: [''],
      fechaDiagnostico: [new Date().toISOString().substring(0, 10), Validators.required]
    });

    this.cargarDatosIniciales();

    // Cargar citas del paciente cuando se seleccione uno
    this.historialForm.get('pacienteId')?.valueChanges.subscribe(pacienteId => {
      this.historialForm.get('citaId')?.reset();
      this.historialForm.get('doctorId')?.reset(); // Asumimos que la cita define al doctor
      if (pacienteId) {
        // En un caso real, aquí se llamarían las citas solo de ese paciente.
        // Por simplicidad del ejemplo, filtramos de una lista completa.
        this.citaService.getAll().subscribe(todasLasCitas => {
            this.citas = todasLasCitas.filter(c => c.paciente.curp == pacienteId);
        });
      } else {
        this.citas = [];
      }
    });
  }

  cargarDatosIniciales(): void {
    this.pacienteService.getAll().subscribe(data => this.pacientes = data);
    this.doctorService.getAll().subscribe(data => this.doctores = data);
  }

  onSubmit(): void {
    if (this.historialForm.invalid) {
      this.historialForm.markAllAsTouched();
      return;
    }
    
    // El doctorId se obtiene de la cita seleccionada
    const citaSeleccionada = this.citas.find(c => c.idCita == this.historialForm.get('citaId')?.value);
    if (!citaSeleccionada) {
        this.error = "Por favor, seleccione una cita válida.";
        return;
    }
    
    const payload: HistorialCreatePayload = {
      ...this.historialForm.value,
      doctorId: citaSeleccionada.doctor.noCedula
    };

    this.historialService.create(payload).subscribe({
      next: (nuevoHistorial) => {
        // Redirigir a la vista de detalle del nuevo historial
        this.router.navigate(['/consultas/historiales', nuevoHistorial.id]);
      },
      error: (err) => this.error = "Error al crear el registro clínico."
    });
  }
}