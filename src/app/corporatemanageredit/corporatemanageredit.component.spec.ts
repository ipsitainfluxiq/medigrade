import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatemanagereditComponent } from './corporatemanageredit.component';

describe('CorporatemanagereditComponent', () => {
  let component: CorporatemanagereditComponent;
  let fixture: ComponentFixture<CorporatemanagereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatemanagereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatemanagereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
