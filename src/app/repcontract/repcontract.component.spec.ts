import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepcontractComponent } from './repcontract.component';

describe('RepcontractComponent', () => {
  let component: RepcontractComponent;
  let fixture: ComponentFixture<RepcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
