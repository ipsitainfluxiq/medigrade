import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgxComponent } from './cgx.component';

describe('CgxComponent', () => {
  let component: CgxComponent;
  let fixture: ComponentFixture<CgxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
