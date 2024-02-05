import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[courseBorder]'
})
export class CourseBorderDirective implements AfterViewInit {
  @Input('courseBorder') courseDate: Date = new Date()

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  changeBorderColor(date: Date) {
    const courseDate = date.getTime()
    const today = new Date().getTime()
    const lastTwoWeeks = today - (14 * 24 * 60 * 60 * 1000)

    if(courseDate < today && courseDate >= lastTwoWeeks) {
      this.renderer.setStyle(this.element.nativeElement, 'border', '1px solid #4CAF50')
    }
    else if (courseDate > today) this.renderer.setStyle(this.element.nativeElement, 'border', '1px solid #2196F3')
  }

  ngAfterViewInit(): void {
    this.changeBorderColor(this.courseDate)
  }

}
