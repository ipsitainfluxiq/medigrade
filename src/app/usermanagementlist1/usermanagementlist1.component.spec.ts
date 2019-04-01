import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Usermanagementlist1Component } from './usermanagementlist1.component';

describe('Usermanagementlist1Component', () => {
  let component: Usermanagementlist1Component;
  let fixture: ComponentFixture<Usermanagementlist1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Usermanagementlist1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Usermanagementlist1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
