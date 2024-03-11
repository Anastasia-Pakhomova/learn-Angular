import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderMenuComponent } from './header-menu.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let fixture: ComponentFixture<HeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMenuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.name = 'Piter';
    spyOn(component.logout, 'emit');
    component.onLogout();
    expect(component.logout.emit).toHaveBeenCalledOnceWith(component.name);
  });
});
