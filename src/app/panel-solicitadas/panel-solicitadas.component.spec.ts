import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSolicitadasComponent } from './panel-solicitadas.component';

describe('PanelSolicitadasComponent', () => {
  let component: PanelSolicitadasComponent;
  let fixture: ComponentFixture<PanelSolicitadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSolicitadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSolicitadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
