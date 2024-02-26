import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public isAuthenticated = false

  constructor(private authService: AuthService, private router: Router) {}

  public login(user: UserInfo) {
    this.authService.login(user)
      .subscribe({
          next: (result) => {
            if(result) this.router.navigateByUrl('/courses');
          }
      })
  }

  public submit(form: NgForm) {
    if(form.value.email.length && form.value.password.length) {
      const emailParts = form.value.email.split('@')
      const user = {
        login: emailParts[0],
        token: form.value.password+emailParts[0],
        email: form.value.email,
        password: form.value.password
      };
      this.login(user)
    }
  }

  ngOnInit(): void {
    this.authService.getIsAuthenticated.subscribe(auth => this.isAuthenticated = auth)
    if(this.isAuthenticated) this.router.navigate(['/courses'])
  }
}
