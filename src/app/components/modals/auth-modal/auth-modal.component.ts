// auth-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
  faTimes = faTimes;

  @Output() login = new EventEmitter<{ email: string; password: string }>();
  @Output() register = new EventEmitter<{ email: string; password: string }>();

  email!: string;
  password!: string;
  rePassword!: string;
  username!: string;

  usernameTaken: boolean = false;
  emailTaken: boolean = false;
  passwordFormatError: boolean = false;
  passwordMatchError: boolean = false;

  constructor(public modalSvc: ModalService) {}

  close() {
    this.modalSvc.isOpenAuthMdl = false;
  }

  onLogin() {
    this.login.emit({ email: this.email, password: this.password });
  }

  onRegister() {
    //this.register.emit({ email: this.email, password: this.password });
  }

  switchMode() {
    this.modalSvc.isLoginMode = !this.modalSvc.isLoginMode;
    this.clearForm();
  }

  private clearForm() {
    this.email = '';
    this.password = '';
  }
}
