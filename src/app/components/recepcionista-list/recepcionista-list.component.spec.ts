import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistaListComponent } from './recepcionista-list.component';

describe('RecepcionistaListComponent', () => {
  let component: RecepcionistaListComponent;
  let fixture: ComponentFixture<RecepcionistaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionistaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
