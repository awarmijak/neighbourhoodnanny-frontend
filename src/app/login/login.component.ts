import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggedUser} from '../model/loggedUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loggedUser: LoggedUser = null;

  constructor(public httpClient: HttpClient, private activeRoute: ActivatedRoute, private router: Router) {
  }

  onFormSubmit(): void {
    this.storeAuthorizationHeaderInLocalStorage();
    this.login(() => {
      alert('Niepoprawne dane logowania');
      this.username = '';
      this.password = '';
    });
    if (this.loggedUser) {
      this.router.navigateByUrl('/main');
    }
  }

  ngOnInit(): void {
  }

  private storeAuthorizationHeaderInLocalStorage(): void {
    const authorizationHeader = 'Basic ' + btoa(this.username + ':' + this.password);
    localStorage.setItem('authorizationHeader', authorizationHeader);
  }

  private login(errorCallback?: () => void): void {
    this.httpClient.post<LoggedUser>('http://localhost:8080/login', {})
      .subscribe(
        loggedUser => {
          this.router.navigate(['/main']);
          this.loggedUser = loggedUser;
        },
        () => {
          if (errorCallback) {
            errorCallback();
          }
        });
  }
}
