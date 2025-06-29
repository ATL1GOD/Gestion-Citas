import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUsuarioFormComponent } from './tipo-usuario-form.component';

describe('TipoUsuarioFormComponent', () => {
  let component: TipoUsuarioFormComponent;
  let fixture: ComponentFixture<TipoUsuarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoUsuarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoUsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
