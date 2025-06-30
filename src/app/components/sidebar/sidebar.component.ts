import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Define la estructura de un elemento de navegación
interface NavItem {
  label: string;
  icon: string; // Clases de Bootstrap Icons (ej. 'bi bi-speedometer2')
  routerLink?: string;
  subItems?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // Define aquí la estructura completa del menú de navegación
  menu: NavItem[] = [
    {
      label: 'Panel de Control',
      icon: 'bi bi-grid-fill',
      routerLink: '/dashboard',
    },
    {
      label: 'Agendamiento',
      icon: 'bi bi-calendar-check-fill',
      subItems: [
        {
          label: 'Citas Médicas',
          icon: 'bi bi-calendar-week',
          routerLink: '/citas',
        },
        // { label: 'Asignaciones (Turnos)', icon: 'bi bi-person-rolodex', routerLink: '/admin/asignaciones' }
      ],
    },
    {
      label: 'Módulo Clínico',
      icon: 'bi bi-heart-pulse-fill',
      subItems: [
        {
          label: 'Historiales Clínicos',
          icon: 'bi bi-file-earmark-medical',
          routerLink: '/consultas/historiales',
        },
        {
          label: 'Recetas Médicas',
          icon: 'bi bi-prescription2',
          routerLink: '/consultas/recetas',
        },
      ],
    },
    {
      label: 'Administración',
      icon: 'bi bi-sliders',
      subItems: [
        {
          label: 'Pacientes',
          icon: 'bi bi-people',
          routerLink: '/admin/pacientes',
        },
        {
          label: 'Doctores',
          icon: 'bi bi-person-badge',
          routerLink: '/admin/doctores',
        },
        {
          label: 'Recepcionistas',
          icon: 'bi bi-person-workspace',
          routerLink: '/admin/recepcionistas',
        },
        {
          label: 'Consultorios',
          icon: 'bi bi-hospital',
          routerLink: '/admin/consultorios',
        },
        {
          label: 'Medicamentos',
          icon: 'bi bi-capsule-pill',
          routerLink: '/admin/medicamentos',
        },
      ],
    },
    {
      label: 'Configuración Sistema',
      icon: 'bi bi-gear-fill',
      subItems: [
        {
          label: 'Usuarios',
          icon: 'bi bi-person-circle',
          routerLink: '/admin/usuarios',
        },
        { label: 'Roles', icon: 'bi bi-key-fill', routerLink: '/admin/roles' },
        {
          label: 'Especialidades',
          icon: 'bi bi-bookmark-star',
          routerLink: '/admin/especialidades',
        },
        {
          label: 'Horarios',
          icon: 'bi bi-clock-history',
          routerLink: '/admin/horarios',
        },
        /*{
          label: 'Estatus',
          icon: 'bi bi-toggles2',
          routerLink: '/admin/estatus',
        },*/
      ],
    },
    {
      label: 'Reportes',
      icon: 'bi bi-file-earmark-bar-graph-fill',
      routerLink: '/reportes',
    },
  ];
}
