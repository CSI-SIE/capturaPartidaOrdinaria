import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarTesoreriaComponent } from './revisar-tesoreria.component';

describe('RevisarTesoreriaComponent', () => {
  let component: RevisarTesoreriaComponent;
  let fixture: ComponentFixture<RevisarTesoreriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarTesoreriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisarTesoreriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
