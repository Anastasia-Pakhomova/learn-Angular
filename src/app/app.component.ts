import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  subscription = new Subscription()
  public isCoursePage = false

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        if(events.url.includes('courses')) this.isCoursePage = true
        else this.isCoursePage = false
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
