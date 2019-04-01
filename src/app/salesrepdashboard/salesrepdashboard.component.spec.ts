import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepdashboardComponent } from './salesrepdashboard.component';

describe('SalesrepdashboardComponent', () => {
  let component: SalesrepdashboardComponent;
  let fixture: ComponentFixture<SalesrepdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
