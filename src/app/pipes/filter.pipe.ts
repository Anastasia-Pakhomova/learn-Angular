import { Pipe, PipeTransform } from '@angular/core';
import { CourseInterface } from '../interfaces/course';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(courseList: CourseInterface[], filterText: string): CourseInterface[] {
    const filteredCourses: CourseInterface[] = []

    if(filterText.length>0) {
      courseList.forEach(item => {
        if ((item.title.toLowerCase()).includes(filterText.toLowerCase()) ) filteredCourses.push(item)
        else if((item.description.toLowerCase()).includes(filterText.toLowerCase()) ) filteredCourses.push(item)
      })
      return filteredCourses;
    }

    return courseList
  }

}
