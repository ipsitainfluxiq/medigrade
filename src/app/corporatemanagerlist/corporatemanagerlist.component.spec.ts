import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatemanagerlistComponent } from './corporatemanagerlist.component';

describe('CorporatemanagerlistComponent', () => {
  let component: CorporatemanagerlistComponent;
  let fixture: ComponentFixture<CorporatemanagerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatemanagerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatemanagerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
