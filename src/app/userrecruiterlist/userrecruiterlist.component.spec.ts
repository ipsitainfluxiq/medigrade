import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrecruiterlistComponent } from './userrecruiterlist.component';

describe('UserrecruiterlistComponent', () => {
  let component: UserrecruiterlistComponent;
  let fixture: ComponentFixture<UserrecruiterlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrecruiterlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrecruiterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
