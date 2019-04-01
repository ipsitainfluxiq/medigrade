import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatemanageraddComponent } from './corporatemanageradd.component';

describe('CorporatemanageraddComponent', () => {
  let component: CorporatemanageraddComponent;
  let fixture: ComponentFixture<CorporatemanageraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatemanageraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatemanageraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
