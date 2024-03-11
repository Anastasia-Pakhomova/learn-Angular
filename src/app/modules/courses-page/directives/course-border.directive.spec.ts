import { CourseBorderDirective } from './course-border.directive';
import {ElementRef, Renderer2} from "@angular/core";

function setup<T>(): { default: () => any; build: () => T; [key: string]: any } {
  const element = { nativeElement: {} } as ElementRef;
  const renderer = { setStyle: jasmine.createSpy('setStyle') } as unknown as Renderer2;
  const builder = {
    renderer,
    element,
    default(): any {
      return builder;
    },
    build(): any {
      return new CourseBorderDirective(element, renderer);
    }
  };
  return builder;
}

describe('CourseBorderDirective', () => {
  let directive: CourseBorderDirective;
  const { build, renderer } = setup<CourseBorderDirective>();

  beforeEach(() => {
    directive = build();
  });

  afterEach(() => {
    renderer.setStyle.calls.reset();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should blue highlight element', () => {
    directive.courseDate = new Date('2024-07-19');
    directive.ngAfterViewInit();

    expect(renderer.setStyle).toHaveBeenCalledOnceWith({}, 'border', '1px solid #2196F3');
  });

  it('should green highlight element', () => {
    directive.courseDate = new Date('2024-03-06');
    directive.ngAfterViewInit();

    expect(renderer.setStyle).toHaveBeenCalledOnceWith({}, 'border', '1px solid #4CAF50');
  });
});


