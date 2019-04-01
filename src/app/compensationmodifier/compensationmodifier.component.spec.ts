import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationmodifierComponent } from './compensationmodifier.component';

describe('CompensationmodifierComponent', () => {
  let component: CompensationmodifierComponent;
  let fixture: ComponentFixture<CompensationmodifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensationmodifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensationmodifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
