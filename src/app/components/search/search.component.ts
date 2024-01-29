import { 
  Component, 
  EventEmitter, 
  Input, 
  Output, 
  OnInit,
  DoCheck,
  OnChanges,
  AfterContentInit, 
  AfterContentChecked, 
  AfterViewChecked, 
  AfterViewInit,
  OnDestroy
 } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,
DoCheck,
OnChanges,
AfterContentInit, 
AfterContentChecked, 
AfterViewChecked, 
AfterViewInit,
OnDestroy {
  @Input() searchValue: String | undefined;
  @Output() searchValueChange = new EventEmitter<String>();

  public onSearch() {
    console.log(this.searchValue)
    this.searchValueChange.emit(this.searchValue);
  }

  ngOnChanges(): void {
    console.log('ngOnChanges')
  }

  ngOnInit(): void {
    console.log('ngOnInit')
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked')
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit')
  }

  ngDoCheck(): void {
    console.log('ngDoCheck')
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked')
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }

}
