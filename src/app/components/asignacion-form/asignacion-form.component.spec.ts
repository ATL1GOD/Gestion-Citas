import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionFormComponent } from './asignacion-form.component';

describe('AsignacionFormComponent', () => {
  let component: AsignacionFormComponent;
  let fixture: ComponentFixture<AsignacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
