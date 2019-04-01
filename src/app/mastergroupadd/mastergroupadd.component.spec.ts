import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastergroupaddComponent } from './mastergroupadd.component';

describe('MastergroupaddComponent', () => {
  let component: MastergroupaddComponent;
  let fixture: ComponentFixture<MastergroupaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastergroupaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastergroupaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
