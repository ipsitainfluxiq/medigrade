import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingstepComponent } from './trainingstep.component';

describe('TrainingstepComponent', () => {
  let component: TrainingstepComponent;
  let fixture: ComponentFixture<TrainingstepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingstepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
