import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarComponent } from './webinar.component';

describe('WebinarComponent', () => {
  let component: WebinarComponent;
  let fixture: ComponentFixture<WebinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
