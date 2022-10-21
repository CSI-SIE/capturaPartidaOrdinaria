import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolicitudPresupuestadaComponent } from './detalle-solicitud-presupuestada.component';

describe('DetalleSolicitudPresupuestadaComponent', () => {
  let component: DetalleSolicitudPresupuestadaComponent;
  let fixture: ComponentFixture<DetalleSolicitudPresupuestadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSolicitudPresupuestadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleSolicitudPresupuestadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
