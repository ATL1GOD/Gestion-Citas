import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Importación de todos los modelos y servicios necesarios
import {
  CitaConsultaService,
  CitaConsultaCreatePayload,
} from '../../services/cita-consulta.service';
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
  styleUrl: './cita-form.component.css',
})
export class CitaFormComponent implements OnInit {
  // Asegúrate de que implementa OnInit
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
      especialidadId: [null, Validators.required],
      // Inicializa doctorId como deshabilitado. Se habilitará cuando se seleccione una especialidad.
      doctorId: [{ value: null, disabled: true }, Validators.required],
      consultorioId: [null, Validators.required],
      estatusId: [null, Validators.required],
    });

    this.cargarDatosDeApoyo();

    // Lógica para el filtrado dinámico de doctores por especialidad
    this.citaForm
      .get('especialidadId')
      ?.valueChanges.subscribe((especialidadId) => {
        const doctorControl = this.citaForm.get('doctorId');
        doctorControl?.reset(); // Resetea el doctor seleccionado
        console.log('Especialidad seleccionada (ID):', especialidadId); // Debugging
        if (especialidadId) {
          // El filtro es correcto según el modelo Doctor.especialidad.idEspecialidad
          this.doctoresFiltrados = this.doctores.filter(
            (d) =>
              d.especialidad && d.especialidad.idEspecialidad == especialidadId
          );
          doctorControl?.enable(); // Habilita el control del doctor
          console.log(
            'Doctores filtrados por especialidad:',
            this.doctoresFiltrados
          ); // Debugging
        } else {
          this.doctoresFiltrados = [];
          doctorControl?.disable(); // Deshabilita si no hay especialidad seleccionada
        }
      });
  }

  cargarDatosDeApoyo(): void {
    // Cargar pacientes
    this.pacienteService.getAll().subscribe((data) => {
      this.pacientes = data;
      console.log('Pacientes cargados:', this.pacientes); // Debugging
    });

    // Cargar todos los doctores
    this.doctorService.getAll().subscribe((data) => {
      this.doctores = data;
      console.log('TODOS los doctores cargados:', this.doctores); // Debugging
    });

    // Cargar especialidades
    this.especialidadService.getAll().subscribe((data) => {
      this.especialidades = data;
      console.log('Especialidades cargadas:', this.especialidades); // Debugging
    });

    // Cargar y filtrar consultorios
    this.consultorioService.getAll().subscribe((data) => {
      console.log('Datos de consultorios recibidos (antes del filtro):', data); // Debugging
      // El filtro es correcto según el modelo Consultorio.estatus.nombre
      this.consultorios = data.filter(
        (c) => c.estatus && c.estatus.nombre.toLowerCase() === 'disponible'
      );
      console.log(
        'Consultorios disponibles (después del filtro):',
        this.consultorios
      ); // Debugging
    });

    // Cargar y filtrar estatus
    this.estatusService.getAll().subscribe((data) => {
      console.log('Datos de estatus recibidos (antes del filtro):', data); // Debugging
      // El filtro es correcto según el modelo Estatus.nombre
      this.estatusLista = data.filter(
        (e) => e.nombre && ['Agendada', 'Confirmada'].includes(e.nombre)
      );
      console.log('Estatus filtrados (después del filtro):', this.estatusLista); // Debugging
    });
  }

  onSubmit(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }

    // Asegúrate de que hora tenga el formato correcto "HH:mm:ss"
    const horaValue = this.citaForm.get('hora')?.value;
    const formattedHora = horaValue ? `${horaValue}:00` : ''; // Añade segundos si solo es HH:mm

    const payload: CitaConsultaCreatePayload = {
      ...this.citaForm.value,
      hora: formattedHora, // Usa la hora formateada
    };

    // La propiedad especialidadId en CitaConsultaCreatePayload está en tu servicio
    // y no en el formulario. Asegúrate de que el backend no lo espere si no lo envías,
    // o agrégalo al payload si es necesario y está en el formulario.
    // Según tu cita-consulta.service.ts, especialidadId SÍ está en el payload.
    // Esto significa que necesitas el valor del campo especialidadId del formulario
    // para ser incluido en el payload. Tu código actual ya lo hace porque usa this.citaForm.value.

    this.citaService.create(payload).subscribe({
      next: () => {
        // Redirigir a la lista de citas después de agendar exitosamente
        this.router.navigate(['/citas']);
      },
      error: (err) => {
        this.error =
          'Error al agendar la cita. Verifique los datos e intente de nuevo.';
        console.error(err);
      },
    });
  }
}
