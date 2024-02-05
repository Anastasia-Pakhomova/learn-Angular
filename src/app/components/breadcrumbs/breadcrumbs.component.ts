import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IBreadcrumbsItems } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public list: IBreadcrumbsItems[] = [
    {
      icon: 'pi pi-home',
      text: 'Курсы',
      link: '/courses'
    },
  ]

  constructor(private coursesService: CoursesService, private router: Router) {}
  
    updateBreadcrumbsItems(route: string): void {
      if(route.length) {
        if(route === 'new') this.list.push({text: 'Новый курс'})
        else {
          let course = this.coursesService.getCourse(+route)
          this.list.push({text: course?.title ?? ''})
        }
      }
      else {
        if(this.list.length>1) this.list.pop()
      }
    }
  
    ngOnInit(): void {
      this.router.events.subscribe(events => {
        if (events instanceof NavigationEnd) {
          let urlArray = events.url.split('/')
          urlArray.shift()
          if(urlArray.length === 2) this.updateBreadcrumbsItems(urlArray[1])
          else this.updateBreadcrumbsItems('')
        }
      })
    }
}
