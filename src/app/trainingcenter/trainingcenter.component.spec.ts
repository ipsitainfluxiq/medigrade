import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingcenterComponent } from './trainingcenter.component';

describe('TrainingcenterComponent', () => {
  let component: TrainingcenterComponent;
  let fixture: ComponentFixture<TrainingcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
