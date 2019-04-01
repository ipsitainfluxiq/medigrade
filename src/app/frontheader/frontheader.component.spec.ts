import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontheaderComponent } from './frontheader.component';

describe('FrontheaderComponent', () => {
  let component: FrontheaderComponent;
  let fixture: ComponentFixture<FrontheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
