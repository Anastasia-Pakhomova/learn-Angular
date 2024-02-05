import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {
  public isUserAuthenticated: boolean = false
  public userName: string = ''

  constructor(private authService: AuthService, private router: Router) {}

  checkAuthenticated() {
    this.isUserAuthenticated = this.authService.isAuthenticated()
  }

  public handleLogout(name: string) {
    this.authService.logout(name)
    this.isUserAuthenticated = this.authService.isAuthenticated()
    this.router.navigate(['/login'])
  }

  ngDoCheck(): void {
    if(!this.isUserAuthenticated) {
      this.checkAuthenticated()
      if(this.isUserAuthenticated) this.userName = this.authService.getUserInfo()
    }
  }
  
}
