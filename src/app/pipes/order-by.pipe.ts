import { Pipe, PipeTransform } from '@angular/core';
import { CourseInterface } from '../interfaces/course';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courseList: CourseInterface[], sortingField: keyof CourseInterface): CourseInterface[] {
    const sortedCourses = courseList.sort((course1, course2) => {
      if(sortingField === 'dateCreation') {
        if(course1.dateCreation.getTime() > course2.dateCreation.getTime()) return -1
        else return 1
      }
      else {
      if(course1[sortingField] > course2[sortingField]) return -1
        else return 1
      }
    })
    return sortedCourses
  }
}
