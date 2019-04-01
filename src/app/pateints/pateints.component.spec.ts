import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PateintsComponent } from './pateints.component';

describe('PateintsComponent', () => {
  let component: PateintsComponent;
  let fixture: ComponentFixture<PateintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PateintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PateintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
