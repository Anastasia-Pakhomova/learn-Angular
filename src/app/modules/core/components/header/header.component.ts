import {Component, DoCheck, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import {SavedUserInfo} from "../../../../interfaces/user";
import {SpinnerService} from "../../../../services/spinner/spinner.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck, OnInit {
  public isUserAuthenticated = false
  public userName = ''
  private userInfo = {token: "", id: 0}

  constructor(private authService: AuthService, private router: Router, private spinnerService: SpinnerService) {}

  // checkAuthenticated() {
  //   this.isUserAuthenticated = this.authService.isAuthenticated()
  // }

  public handleLogout(name: string) {
    this.authService.logout(name, this.userInfo.id)
      .subscribe(response => console.log(response))
    // this.isUserAuthenticated = this.authService.isAuthenticated()
    this.router.navigate(['/login'])
  }

  ngDoCheck(): void {
    // if(!this.isUserAuthenticated) {
    //   this.checkAuthenticated()
    //   if(this.isUserAuthenticated) {
    //     const user = localStorage.getItem('userInfo')
    //      if(user !== null) {
    //        this.userInfo = JSON.parse(user)
    //        this.authService.getUserInfo(this.userInfo.token)
    //          .subscribe((data: SavedUserInfo[]) => {
    //            this.userName = data[0].login
    //          })
    //      }
    //   }
    // }
  }

  ngOnInit(): void {
//     this.authService.getIsAuthenticated().subscribe((auth: any) => {
//       this.isUserAuthenticated = auth
// console.log('this.isUserAuthenticated', this.isUserAuthenticated)
//       if(this.isUserAuthenticated) {
//         const user = localStorage.getItem('userInfo')
//         if(user !== null) {
//           this.userInfo = JSON.parse(user)
//           this.authService.getUserInfo(this.userInfo.token).pipe(
//             map((data: SavedUserInfo[]) => this.userName = data[0].login)
//           )
//         }
//       }
//     })
    this.authService.hotDate().subscribe((auth: any) => {
      this.isUserAuthenticated = auth
      console.log('this.isUserAuthenticated', this.isUserAuthenticated)
      if(auth) {
        const user = localStorage.getItem('userInfo')
        if(user !== null) {
          this.userInfo = JSON.parse(user)
          // this.authService.getUserInfo(this.userInfo.token).subscribe(
          //   result => this.userName = result.login
          // )
        }
      }
    })
  }

}
