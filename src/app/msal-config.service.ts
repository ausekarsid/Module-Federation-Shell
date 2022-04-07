import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class MsalConfigService {
  constructor(private msalService: MsalService) { }

  canActivate() {
    return this.msalService.instance.getActiveAccount() != null;
  }
}
