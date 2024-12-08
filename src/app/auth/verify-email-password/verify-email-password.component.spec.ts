import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailPasswordComponent } from './verify-email-password.component';

describe('VerifyEmailPasswordComponent', () => {
  let component: VerifyEmailPasswordComponent;
  let fixture: ComponentFixture<VerifyEmailPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyEmailPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyEmailPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
