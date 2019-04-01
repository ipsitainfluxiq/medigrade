import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PateintquestionireComponent } from './pateintquestionire.component';

describe('PateintquestionireComponent', () => {
  let component: PateintquestionireComponent;
  let fixture: ComponentFixture<PateintquestionireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PateintquestionireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PateintquestionireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
