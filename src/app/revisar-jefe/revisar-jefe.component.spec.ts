import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarJefeComponent } from './revisar-jefe.component';

describe('RevisarJefeComponent', () => {
  let component: RevisarJefeComponent;
  let fixture: ComponentFixture<RevisarJefeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarJefeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisarJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
