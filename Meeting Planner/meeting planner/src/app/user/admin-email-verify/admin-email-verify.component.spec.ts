import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmailVerifyComponent } from './admin-email-verify.component';

describe('AdminEmailVerifyComponent', () => {
  let component: AdminEmailVerifyComponent;
  let fixture: ComponentFixture<AdminEmailVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmailVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
