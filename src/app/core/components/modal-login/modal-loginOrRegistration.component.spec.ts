import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginOrRegistrationComponent } from './modal-loginOrRegistration.component';

describe('ModalLoginComponent', () => {
  let component: ModalLoginOrRegistrationComponent;
  let fixture: ComponentFixture<ModalLoginOrRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLoginOrRegistrationComponent]
    });
    fixture = TestBed.createComponent(ModalLoginOrRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
