import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionMesesComponent } from './distribucion-meses.component';

describe('DistribucionMesesComponent', () => {
  let component: DistribucionMesesComponent;
  let fixture: ComponentFixture<DistribucionMesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribucionMesesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribucionMesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
