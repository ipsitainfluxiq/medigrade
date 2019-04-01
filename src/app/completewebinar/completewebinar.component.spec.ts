import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletewebinarComponent } from './completewebinar.component';

describe('CompletewebinarComponent', () => {
  let component: CompletewebinarComponent;
  let fixture: ComponentFixture<CompletewebinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletewebinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletewebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
