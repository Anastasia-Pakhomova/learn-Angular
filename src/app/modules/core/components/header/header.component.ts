import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private userInfo = {token: "", id: 0}

  constructor(public authService: AuthService, private router: Router) {}

  public handleLogout(name: string) {
    const user = localStorage.getItem('userInfo')
    if(user !== null) {
      this.userInfo = JSON.parse(user)
    }
    this.authService.logout(name, this.userInfo.id).subscribe()
    this.router.navigate(['/login'])
  }

}
