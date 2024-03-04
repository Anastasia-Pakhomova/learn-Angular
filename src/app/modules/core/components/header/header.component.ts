import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "src/app/store";
import {logout} from "src/app/store/auth/actions/auth-actions.actions";
import {Observable} from "rxjs";
import {
  selectIsAuthenticated,
  selectUserName
} from "src/app/store/auth/selectors/auth-selectors.selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private userInfo = {token: "", id: 0}
  public IsAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated);
  public userName$: Observable<string> = this.store.select(selectUserName);

  constructor(private store: Store<State>) {}

  public handleLogout(name: string) {
    const user = localStorage.getItem('userInfo')
    if(user !== null) {
      this.userInfo = JSON.parse(user)
    }
    this.store.dispatch(logout({name, id: this.userInfo.id}))
  }

}
