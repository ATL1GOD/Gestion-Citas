import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Importación de todos los modelos y servicios necesarios
import { CitaConsultaService, CitaConsultaCreatePayload } from '../../services/cita-consulta.service';
import { PacienteService } from '../../services/paciente.service';
import { DoctorService } from '../../services/doctor.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { ConsultorioService } from '../../services/consultorio.service';
import { EstatusService } from '../../services/estatus.service';

import { Paciente } from '../../models/paciente.model';
import { Doctor } from '../../models/doctor.model';
import { Especialidad } from '../../models/especialidad.model';
import { Consultorio } from '../../models/consultorio.model';
import { Estatus } from '../../models/estatus.model';



@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cita-form.component.html',
  styleUrl: './cita-form.component.css'
})
export class CitaFormComponent {
  citaForm!: FormGroup;
  error: string | null = null;

  // Arreglos para poblar los <select>
  pacientes: Paciente[] = [];
  doctores: Doctor[] = [];
  doctoresFiltrados: Doctor[] = [];
  especialidades: Especialidad[] = [];
  consultorios: Consultorio[] = [];
  estatusLista: Estatus[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private citaService: CitaConsultaService,
    private pacienteService: PacienteService,
    private doctorService: DoctorService,
    private especialidadService: EspecialidadService,
    private consultorioService: ConsultorioService,
    private estatusService: EstatusService
  ) {}

  ngOnInit(): void {
    this.citaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: ['', Validators.required],
      pacienteId: [null, Validators.required],
      especialidadId: [null, Validators.required], // El usuario selecciona primero la especialidad
      doctorId: [null, Validators.required],
      consultorioId: [null, Validators.required],
      estatusId: [null, Validators.required],
    });

    this.cargarDatosDeApoyo();

    // Lógica para el filtrado dinámico de doctores por especialidad
    this.citaForm.get('especialidadId')?.valueChanges.subscribe(especialidadId => {
      this.citaForm.get('doctorId')?.reset(); // Resetea el doctor seleccionado
      if (especialidadId) {
        this.doctoresFiltrados = this.doctores.filter(d => d.especialidad.idEspecialidad == especialidadId);
      } else {
        this.doctoresFiltrados = [];
      }
    });
  }

  cargarDatosDeApoyo(): void {
    // Cargar todos los datos necesarios para los selects del formulario
    this.pacienteService.getAll().subscribe(data => this.pacientes = data);
    this.doctorService.getAll().subscribe(data => this.doctores = data);
    this.especialidadService.getAll().subscribe(data => this.especialidades = data);
    this.consultorioService.getAll().subscribe(data => {
        // Filtramos para mostrar solo consultorios disponibles
        this.consultorios = data.filter(c => c.estatus.nombre.toLowerCase() === 'disponible');
    });
    this.estatusService.getAll().subscribe(data => {
        // Filtramos para mostrar solo estatus relevantes para agendar
        this.estatusLista = data.filter(e => ['Agendada', 'Confirmada'].includes(e.nombre));
    });
  }

  onSubmit(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }
    
    const payload: CitaConsultaCreatePayload = this.citaForm.value;

    this.citaService.create(payload).subscribe({
      next: () => {
        // Redirigir a la lista de citas después de agendar exitosamente
        this.router.navigate(['/citas']);
      },
      error: (err) => {
        this.error = "Error al agendar la cita. Verifique los datos e intente de nuevo.";
        console.error(err);
      }
    });
  }
}
