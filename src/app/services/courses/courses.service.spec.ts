import { CoursesService } from './courses.service';
import {HttpClient} from "@angular/common/http";
import {autoSpy, SpyOf} from "../../utils/auto-spy";
import {CourseInterface} from "../../interfaces/course";
import {cold} from "jasmine-marbles";

function setup<T>(): { default: () => any; build: () => T; httpClient: SpyOf<HttpClient>, [key: string]: any } {
  const httpClient: SpyOf<HttpClient> = autoSpy(HttpClient);
  const builder = {
    httpClient,
    default(): any {
      return builder;
    },
    build(): any {
      return new CoursesService(httpClient);
    }
  };
  return builder;
}

describe('CoursesService', () => {
  let service: CoursesService;
  const coursesUrl = 'http://localhost:3000';
  const { build, httpClient } = setup<CoursesService>();

  beforeEach(() => {
    service = build();
  });

  afterEach(() => {
    httpClient.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses', () => {
    const expected: CourseInterface[] = [{
      id: 1706889958285,
      title: "test",
      dateCreation: new Date("2024-02-05T21:00:00.000Z"),
      duration: 50,
      description: "test about",
      topRated: false,
      authors: []
    },
      {
        id: 1707136612682,
        title: "new",
        dateCreation: new Date("2024-02-06T21:00:00.000Z"),
        duration: 35,
        description: "test nnn",
        topRated: true,
        authors: []
      }];

    httpClient.get.and.returnValue(cold('-a', { a: expected }));

    expect(service.getList()).toBeObservable(cold('-a', { a: expected }));
    expect(httpClient.get).toHaveBeenCalledOnceWith(`${ coursesUrl }/courses?_start=0&_limit=5&_sort=dateCreation&_order=desc`);
  });

  it('should create course', () => {
    const expected: CourseInterface = {
      id: 1706889958285,
      title: "test",
      dateCreation: new Date("2024-02-05T21:00:00.000Z"),
      duration: 50,
      description: "test about",
      topRated: false,
      authors: [
        {
        id: 13,
        name: "Marilyn Monroe"
      }
      ]
    }

    httpClient.post.and.returnValue(cold('-a', { a: expected }));

    expect(service.createCourse(expected)).toBeObservable(cold('-a', { a: expected }));
    expect(httpClient.post).toHaveBeenCalledOnceWith(`${ coursesUrl }/courses`, expected);
  });

  it('should update course', () => {
    const expected: CourseInterface = {
      id: 1706889958285,
      title: "test",
      dateCreation: new Date("2024-02-05T21:00:00.000Z"),
      duration: 50,
      description: "test about",
      topRated: false,
      authors: [
        {
          id: 13,
          name: "Marilyn Monroe"
        }
      ]
    }

    httpClient.put.and.returnValue(cold('-a', {a: expected} ));

    expect(service.updateCourse(1706889958285, expected)).toBeObservable(cold('-a', {a: expected} ));
    expect(httpClient.put).toHaveBeenCalledOnceWith(`${ coursesUrl }/courses/1706889958285`, expected);
  });

  it('should remove course', () => {
    httpClient.delete.and.returnValue(cold('-a', {a: {}} ));
    expect(service.removeCourse(1706889958285)).toBeObservable(cold('-a', {a: {}} ));
    expect(httpClient.delete).toHaveBeenCalledOnceWith(`${ coursesUrl }/courses/1706889958285`);
  });

  it('should search courses', () => {
    const expected = [
      {
        title: "new course edit",
        description: "new test course",
        duration: "160",
        dateCreation: "2024-03-18T21:00:00.000Z",
        authors: [
          {
            id: 5,
            name: "Anna Katz"
          },
          {
            id: 6,
            name: "Ann Hoho"
          }
        ],
        id: 1708506201426,
        topRated: false,
      }
    ]

    httpClient.get.and.returnValue(cold('-a', { a: expected }));
    expect(service.searchCourses('edit')).toBeObservable(cold('-a', { a: expected }));
    expect(httpClient.get).toHaveBeenCalledOnceWith(`${ coursesUrl }/courses?q=edit`);
  });

  it('should search courses', () => {
    const expected = [
      {
        id: 1,
        name: "Alex Lo"
      },
      {
        id: 2,
        name: "Alex Ivanov"
      },
    ]

    httpClient.get.and.returnValue(cold('-a', { a: expected }));
    expect(service.getAuthors()).toBeObservable(cold('-a', { a: expected }));
    expect(httpClient.get).toHaveBeenCalledOnceWith(`${ coursesUrl }/authors`);
  });
});
