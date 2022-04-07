import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  PopupRequest,
  AuthenticationResult,
  RedirectRequest,
} from '@azure/msal-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'windowed-observable';
import { ClientService } from './client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: any;
  elseMessage: string = 'Authentication and Authorization in progress';
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.checkAndLogin();
  }

  checkForClientService(element: string, index: any, array: any) {
    return element == 'ClientServiceAdmin';
  }

  isAuthorized: boolean = false;
  checkAndLogin() {
    console.log('checkAndLogin');
    if (this.msalService.instance.getAllAccounts().length > 0) {
      let accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
      this.getUserInfo();
    } else {
      this.loginPopup();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(response.account);
          window.location.reload();
        });
    } else {
      this.msalService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(response.account);
        });
    }
  }

  async loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      await this.msalService.loginRedirect();
    }
  }

  // ngOnInit(): void {
  //   const observable = new Observable('shell');

  //   observable.publish('Senju Tobirama shell');

  //   const observable2 = new Observable('mfe1');
  //   observable2.subscribe((ninja) => console.log(ninja));
  // }
  title = 'shell';
  clientServicePresent: any = false;
  getUserInfo() {
    this.spinner.show();
    this.clientService
      .getUserInfo(this.msalService.instance.getActiveAccount().username)
      .subscribe(
        (response: any) => {
          this.elseMessage = 'Authentication and Authorization successful!';
          if (response != null) {
            var user = response;
            if (
              user.rolesList.length > 1 ||
              user.rolesList[0] != 'PlatformAdmin'
            ) {
              this.clientServicePresent = user.rolesList.filter(
                this.checkForClientService
              );
              if (
                window.location.href.indexOf('dashboardadmin') > 0 &&
                !this.clientServicePresent[0]
              ) {
                this.router.navigate(['error']);
              }
            }
            sessionStorage.setItem('userInfo', JSON.stringify(response));
            // this.loadStatusPageAccessDetails();
            sessionStorage.setItem(
              'clientServicePresent',
              this.clientServicePresent
            );
            this.user = JSON.parse(sessionStorage.getItem('userInfo'));
            this.router.navigate(['/digitalai']);
            this.spinner.hide();
            this.isAuthorized = true;
          } else {
            this.router.navigate(['error']);
            this.spinner.hide();
          }
        },
        (error: any) => {
          this.elseMessage = 'Error in getting user info. Authorization Failed!';
          //this.isFailure=true;
          if (error.status == 403) {
            this.getUserInfo();
          } else {
            setTimeout(() => {
              this.spinner.hide();
            }, 3000);

            this.router.navigate(['error']);
          }
        }
      );

    return true;
  }
}
