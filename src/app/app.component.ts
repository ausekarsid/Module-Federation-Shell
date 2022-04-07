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
    private router: Router,
    private spinner: NgxSpinnerService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
  }
}
