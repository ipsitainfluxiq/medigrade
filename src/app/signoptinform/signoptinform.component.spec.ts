import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoptinformComponent } from './signoptinform.component';

describe('SignoptinformComponent', () => {
  let component: SignoptinformComponent;
  let fixture: ComponentFixture<SignoptinformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoptinformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoptinformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
