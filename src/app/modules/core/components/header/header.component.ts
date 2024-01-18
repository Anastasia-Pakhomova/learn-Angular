import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isUserAuthenticated: boolean = false
  @Input() userName: string = ''
  @Output() isUserAuthenticatedChange = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  public handleLogout(name: string) {
    this.authService.logout(name)
    this.isUserAuthenticated = this.authService.isAuthenticated()
    this.isUserAuthenticatedChange.emit(this.isUserAuthenticated);
  }
  
}
