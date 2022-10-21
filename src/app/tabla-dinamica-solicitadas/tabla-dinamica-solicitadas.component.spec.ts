import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDinamicaSolicitadasComponent } from './tabla-dinamica-solicitadas.component';

describe('TablaDinamicaSolicitadasComponent', () => {
  let component: TablaDinamicaSolicitadasComponent;
  let fixture: ComponentFixture<TablaDinamicaSolicitadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDinamicaSolicitadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDinamicaSolicitadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
