import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersignupComponent } from './recruitersignup.component';

describe('RecruitersignupComponent', () => {
  let component: RecruitersignupComponent;
  let fixture: ComponentFixture<RecruitersignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitersignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
