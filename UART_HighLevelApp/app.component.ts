import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { slideInAnimation } from './app.animations';

export interface IContext {
  data: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {

  title = 'passplayAdmin';
  pageDimmed = false;
  loggedIn: boolean = (!(this.auth.user == null));
  version: string = environment.version === '#{Build.BuildNumber}#' ? '' : `   | version: ${environment.version}`;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    this.init(location.hash);
  }

  init(hash: string) {
    if (hash) {
      if (this.auth.parseLoginInfo(hash as string)) {
        this.auth.iniUserInfo();
      }
      location.hash = '';
    } else {
      this.auth.ngOnInit();
    }
  }
}
