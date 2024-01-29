import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  public list = [
    {
      icon: 'pi pi-home',
      text: 'Курсы'
    },
    {
      text: 'Item2'
    }
  ]
}
