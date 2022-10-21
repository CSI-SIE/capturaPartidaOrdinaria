import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMesComponent } from './panel-mes.component';

describe('PanelMesComponent', () => {
  let component: PanelMesComponent;
  let fixture: ComponentFixture<PanelMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelMesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
