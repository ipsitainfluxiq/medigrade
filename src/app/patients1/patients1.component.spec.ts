import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Patients1Component } from './patients1.component';

describe('Patients1Component', () => {
  let component: Patients1Component;
  let fixture: ComponentFixture<Patients1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Patients1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Patients1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
