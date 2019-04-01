import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PateintdetailComponent } from './pateintdetail.component';

describe('PateintdetailComponent', () => {
  let component: PateintdetailComponent;
  let fixture: ComponentFixture<PateintdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PateintdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PateintdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
