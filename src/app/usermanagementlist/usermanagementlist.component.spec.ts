import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagementlistComponent } from './usermanagementlist.component';

describe('UsermanagementlistComponent', () => {
  let component: UsermanagementlistComponent;
  let fixture: ComponentFixture<UsermanagementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermanagementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermanagementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
