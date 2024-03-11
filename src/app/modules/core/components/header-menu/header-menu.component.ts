import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  @Input() name = ''
  @Output() logout = new EventEmitter<string>()

  onLogout() {
    this.logout.emit(this.name)
  }
}
