import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {PasswordTokenDTO} from '../model/passwordTokenDTO';

@Component({
  selector: 'app-register',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  email: string;

  newPasswordToken: PasswordTokenDTO = {
    password: '',
    token: ''
  };

  constructor(public httpClient: HttpClient, private activeRoute: ActivatedRoute, private router: Router) {
    this.email = '';
  }

  onFormSubmit(): void {
    console.log('Submitted Forgot Password Form');
    this.httpClient.get('http://localhost:8080/mailer/RemindPassword/' + this.email)
      .subscribe();
  }

  resetPassword(): void {
    this.httpClient.post('http://localhost:8080/mailer/RemindPassword/', this.newPasswordToken)
      .subscribe();
    this.router.navigateByUrl('/login');
  }

  goBack(): void {
    window.history.back();
  }
}
