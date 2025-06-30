import { Routes } from '@angular/router';

// Importa todos los componentes que has creado
// Sección 1: Administración y Usuarios
import { UsuarioListComponent } from '../app/components/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from '../app/components/usuario-form/usuario-form.component';
import { TipoUsuarioListComponent } from '../app/components/tipo-usuario-list/tipo-usuario-list.component';
import { TipoUsuarioFormComponent } from '../app/components/tipo-usuario-form/tipo-usuario-form.component';

// Sección 2: Personal y Pacientes
import { EspecialidadListComponent } from '../app/components/especialidad-list/especialidad-list.component';
import { EspecialidadFormComponent } from '../app/components/especialidad-form/especialidad-form.component';
import { PacienteListComponent } from '../app/components/paciente-list/paciente-list.component';
import { PacienteFormComponent } from '../app/components/paciente-form/paciente-form.component';


// Sección 3: Citas y Agendas
import { ConsultorioListComponent } from '../app/components/consultorio-list/consultorio-list.component';
import { ConsultorioFormComponent } from '../app/components/consultorio-form/consultorio-form.component';
import { HorarioListComponent } from '../app/components/horario-list/horario-list.component';
import { HorarioFormComponent } from '../app/components/horario-form/horario-form.component';
import { AsignacionListComponent } from '../app/components/asignacion-list/asignacion-list.component';
import { AsignacionFormComponent } from '../app/components/asignacion-form/asignacion-form.component';
import { CitaListComponent } from '../app/components/cita-list/cita-list.component';
import { CitaFormComponent } from '../app/components/cita-form/cita-form.component';


// Sección 4: Módulo Clínico
import { MedicamentoListComponent } from '../app/components/medicamento-list/medicamento-list.component';
import { MedicamentoFormComponent } from '../app/components/medicamento-form/medicamento-form.component';
import { RecetaListComponent } from '../app/components/receta-list/receta-list.component';
import { RecetaFormComponent } from '../app/components/receta-form/receta-form.component';
import { RecetaDetailComponent } from '../app/components/receta-detail/receta-detail.component';

// Componente de inicio
import { DashboardComponent } from './components/dashboard/dashboard.component';


export const routes: Routes = [
    // --- Ruta por defecto ---
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },

    // --- Rutas de Agendamiento y Consultas (para roles como Doctor/Recepcionista) ---
    { path: 'citas', component: CitaListComponent, title: 'Agenda de Citas' },
    { path: 'citas/nuevo', component: CitaFormComponent, title: 'Agendar Nueva Cita' },
    // { path: 'citas/editar/:id', component: CitaFormComponent, title: 'Editar Cita' }, // Descomentar si implementas la edición

    { path: 'consultas/recetas', component: RecetaListComponent, title: 'Recetas Médicas' },
    { path: 'consultas/recetas/nuevo', component: RecetaFormComponent, title: 'Crear Receta' },
    { path: 'consultas/recetas/detalles/:id', component: RecetaDetailComponent, title: 'Detalles de Receta' },

    // --- Rutas de Administración (prefijo /admin) ---
    // Usuarios y Roles
    { path: 'admin/usuarios', component: UsuarioListComponent, title: 'Gestión de Usuarios' },
    { path: 'admin/usuarios/nuevo', component: UsuarioFormComponent, title: 'Nuevo Usuario' },
    { path: 'admin/usuarios/editar/:id', component: UsuarioFormComponent, title: 'Editar Usuario' },
    { path: 'admin/roles', component: TipoUsuarioListComponent, title: 'Gestión de Roles' },
    { path: 'admin/roles/nuevo', component: TipoUsuarioFormComponent, title: 'Nuevo Rol' },
    { path: 'admin/roles/editar/:id', component: TipoUsuarioFormComponent, title: 'Editar Rol' },

    // Pacientes, Doctores y Recepcionistas
    { path: 'admin/pacientes', component: PacienteListComponent, title: 'Gestión de Pacientes' },
    { path: 'admin/pacientes/nuevo', component: PacienteFormComponent, title: 'Nuevo Paciente' },
    { path: 'admin/pacientes/editar/:id', component: PacienteFormComponent, title: 'Editar Paciente' },
    
    // { path: 'admin/doctores', component: DoctorListComponent, title: 'Gestión de Doctores' },
    // { path: 'admin/recepcionistas', component: RecepcionistaListComponent, title: 'Gestión de Recepcionistas' },

    // Infraestructura
    { path: 'admin/consultorios', component: ConsultorioListComponent, title: 'Gestión de Consultorios' },
    { path: 'admin/consultorios/nuevo', component: ConsultorioFormComponent, title: 'Nuevo Consultorio' },
    { path: 'admin/consultorios/editar/:id', component: ConsultorioFormComponent, title: 'Editar Consultorio' },

    { path: 'admin/horarios', component: HorarioListComponent, title: 'Gestión de Horarios' },
    { path: 'admin/horarios/nuevo', component: HorarioFormComponent, title: 'Nuevo Horario' },

    { path: 'admin/asignaciones', component: AsignacionListComponent, title: 'Gestión de Asignaciones' },
    { path: 'admin/asignaciones/nuevo', component: AsignacionFormComponent, title: 'Nueva Asignación' },

    // Catálogos
    { path: 'admin/especialidades', component: EspecialidadListComponent, title: 'Gestión de Especialidades' },
    { path: 'admin/especialidades/nuevo', component: EspecialidadFormComponent, title: 'Nueva Especialidad' },
    { path: 'admin/especialidades/editar/:id', component: EspecialidadFormComponent, title: 'Editar Especialidad' },

    { path: 'admin/medicamentos', component: MedicamentoListComponent, title: 'Catálogo de Medicamentos' },
    { path: 'admin/medicamentos/nuevo', component: MedicamentoFormComponent, title: 'Nuevo Medicamento' },
    { path: 'admin/medicamentos/editar/:id', component: MedicamentoFormComponent, title: 'Editar Medicamento' },

    // --- Ruta Wildcard para páginas no encontradas ---
    { path: '**', redirectTo: '/dashboard' } // Redirige a dashboard si la ruta no existe
];