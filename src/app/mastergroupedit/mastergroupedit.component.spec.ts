/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MastergroupeditComponent } from './mastergroupedit.component';

describe('MastergroupeditComponent', () => {
  let component: MastergroupeditComponent;
  let fixture: ComponentFixture<MastergroupeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastergroupeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastergroupeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
