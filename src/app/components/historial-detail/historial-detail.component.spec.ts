import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDetailComponent } from './historial-detail.component';

describe('HistorialDetailComponent', () => {
  let component: HistorialDetailComponent;
  let fixture: ComponentFixture<HistorialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
