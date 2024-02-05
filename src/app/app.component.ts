import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public isCoursePage = false

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        if(events.url.includes('courses')) this.isCoursePage = true
        else this.isCoursePage = false
      }
    })
  }
}
