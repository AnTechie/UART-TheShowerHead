import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnInit, Directive } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditEmployeeComponent } from './components/general/edit-employee/edit-employee.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { TranslatorPipe } from './pipes/translator.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService } from './services/auth.service';
import { ComponentFixture } from '@angular/core/testing/testing';
import { GeoCountrySelectComponent } from './common/controls/geo-country-select/geo-country-select.component';
import { DisplayNameDropdownComponent } from './common/controls/display-name-dropdown/display-name-dropdown.component';
import { ToasterComponent } from './components/toaster/toaster.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let customResponse = true;

  @Directive()
class AuthServiceMockDirective implements OnInit {
    public parseLoginInfo(input: string): boolean {
      return customResponse;
    }

    public ngOnInit(): void {
      window.location.hash = 'test';
    }

    public iniUserInfo(): void { }
  }

  const authServiceMock = new AuthServiceMockDirective();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NgSelectModule
      ],
      declarations: [
        AppComponent,
        DisplayNameDropdownComponent,
        GeoCountrySelectComponent,
        HeaderComponent,
        NavComponent,
        ToasterComponent,
        TranslatorPipe,
        EditEmployeeComponent,
      ],
      providers: [
        EditEmployeeComponent,
        NgbActiveModal,
        ReactiveFormsModule,
        { provide: AuthService, useValue: authServiceMock }
      ],
    });

    TestBed.overrideComponent(AppComponent,
      {
        set: {
          template: '<div>Overridden template here></div>'
        }
      });

    TestBed.compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('properties and methods', () => {
    it('should have properties and methods defined with default values', () => {
      expect(component.title).toBeDefined('title');
      expect(component.title).toBe('passplayAdmin');
      expect(component.pageDimmed).toBeDefined('pageDimmed');
      expect(component.pageDimmed).toBeFalsy();
      expect(component.loggedIn).toBeDefined('loggedIn');
      expect(component.loggedIn).toBeFalsy();
    });
  });

  describe('ngOnInit with location.hash valid', () => {

    it('calls ngOnInit() and expect it to have been called',
      () => {
        spyOn(authServiceMock, 'parseLoginInfo').and.returnValue(true);
        spyOn(authServiceMock, 'iniUserInfo').and.callThrough();
        component.init('#');
        expect(authServiceMock.parseLoginInfo).toHaveBeenCalled();
        expect(authServiceMock.iniUserInfo).toHaveBeenCalled();
      });

    it('calls ngOnInit() parseLoginInfo is false and iniUserInfo is not called',
      () => {
        spyOn(authServiceMock, 'parseLoginInfo').and.returnValue(false);
        spyOn(authServiceMock, 'iniUserInfo').and.callThrough();
        customResponse = false;
        component.init('#');
        expect(authServiceMock.iniUserInfo).not.toHaveBeenCalled();
        expect(authServiceMock.parseLoginInfo).toHaveBeenCalled();
      });
  });
});
