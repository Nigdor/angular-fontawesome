import { Component, ElementRef, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '../icon/icon.component';
import { FaStackItemSizeDirective } from './stack-item-size.directive';
import { FaStackComponent } from './stack.component';

function initTest<T>(component: Type<T>): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [FaStackComponent, FaStackItemSizeDirective, FaIconComponent, component],
  });
  library.add(faUser);
  return TestBed.createComponent(component);
}

function queryByCss(fixture: ComponentFixture<any>, cssSelector: string): ElementRef {
  return fixture.nativeElement.querySelector(cssSelector);
}

describe('FaStackComponent', () => {
  it('should render stack icon', () => {
    @Component({
      selector: 'fa-host',
      template: `
          <fa-stack>
              <fa-icon [icon]="faCircle" stackItemSize="2x"></fa-icon>
              <fa-icon [icon]="faUser" [inverse]="true" stackItemSize="1x"></fa-icon>
          </fa-stack>`
    })
    class HostComponent {
      faUser = faUser;
      faCircle = faCircle;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should include size class', () => {
    @Component({
      selector: 'fa-host',
      template: `
          <fa-stack size="2x">
              <fa-icon [icon]="faCircle" stackItemSize="2x"></fa-icon>
              <fa-icon [icon]="faUser" [inverse]="true" stackItemSize="1x"></fa-icon>
          </fa-stack>`
    })
    class HostComponent {
      faUser = faUser;
      faCircle = faCircle;
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-2x')).toBeTruthy();
  });
});
