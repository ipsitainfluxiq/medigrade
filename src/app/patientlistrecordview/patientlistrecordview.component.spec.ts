import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlistrecordviewComponent } from './patientlistrecordview.component';

describe('PatientlistrecordviewComponent', () => {
  let component: PatientlistrecordviewComponent;
  let fixture: ComponentFixture<PatientlistrecordviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientlistrecordviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientlistrecordviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
