import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrecruiterdetailComponent } from './userrecruiterdetail.component';

describe('UserrecruiterdetailComponent', () => {
  let component: UserrecruiterdetailComponent;
  let fixture: ComponentFixture<UserrecruiterdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrecruiterdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrecruiterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
