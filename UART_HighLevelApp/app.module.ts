import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { LandingComponent } from './components/landing/landing.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SharedModule } from './components/shared/shared.module';
import { ToasterComponent } from './components/toaster/toaster.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

export const tokenGetter = () => localStorage.getItem('access_token');


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    NavComponent,
    ToasterComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    NgbModule,
    ClipboardModule,
    NgxPermissionsModule.forRoot(),
    SharedModule.forRoot(),
    NgxsModule.forRoot([]),
    NgxsResetPluginModule.forRoot(),
    environment.plugins
  ],
  providers: [
    DatePipe,
    HttpClientModule,
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
