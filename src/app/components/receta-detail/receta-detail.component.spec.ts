import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaDetailComponent } from './receta-detail.component';

describe('RecetaDetailComponent', () => {
  let component: RecetaDetailComponent;
  let fixture: ComponentFixture<RecetaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
