import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDinamicaMesComponent } from './tabla-dinamica-mes.component';

describe('TablaDinamicaMesComponent', () => {
  let component: TablaDinamicaMesComponent;
  let fixture: ComponentFixture<TablaDinamicaMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDinamicaMesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDinamicaMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
