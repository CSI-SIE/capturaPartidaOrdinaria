import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDinamicaAdminComponent } from './tabla-dinamica-admin.component';

describe('TablaDinamicaAdminComponent', () => {
  let component: TablaDinamicaAdminComponent;
  let fixture: ComponentFixture<TablaDinamicaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDinamicaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDinamicaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
