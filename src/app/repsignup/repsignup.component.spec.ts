import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepsignupComponent } from './repsignup.component';

describe('RepsignupComponent', () => {
  let component: RepsignupComponent;
  let fixture: ComponentFixture<RepsignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepsignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
