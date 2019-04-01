import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrecruitereditComponent } from './userrecruiteredit.component';

describe('UserrecruitereditComponent', () => {
  let component: UserrecruitereditComponent;
  let fixture: ComponentFixture<UserrecruitereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrecruitereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrecruitereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
