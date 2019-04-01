/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MastergrouplistComponent } from './mastergrouplist.component';

describe('MastergrouplistComponent', () => {
  let component: MastergrouplistComponent;
  let fixture: ComponentFixture<MastergrouplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastergrouplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastergrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
