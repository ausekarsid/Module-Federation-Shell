import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { MsalInterceptorConfiguration, MsalGuardConfiguration, MsalBroadcastService, MsalGuard, MsalInterceptor, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { LogLevel, IPublicClientApplication, PublicClientApplication, BrowserCacheLocation, InteractionType } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { CookieXSRFStrategy, XSRFStrategy } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

// export function initializer(adalService: MsalService) {
//   return () => new Promise<void>((resolve, reject) => {
//     if (adalService.instance.getActiveAccount!=null) {
//       resolve();
//     } else {
//       adalService.loginRedirect();
//     }
//   });
// }

export function loggerCallback(logLevel: LogLevel, message: string) {
    console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      // clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6', // Prod enviroment. Uncomment to use.
      clientId: "a504efbd-7d26-49d0-83b6-97286e45a756", // PPE testing environment
      // secret: "E7P7Q~FzQGVMApsDjSefoTv5tQXAPn~CQmmp8"
      // authority: 'https://login.microsoftonline.com/common', // Prod environment. Uncomment to use.
      authority:
        "https://login.microsoftonline.com/1e355c04-e0a4-42ed-8e2d-7351591f0ef1/", // PPE testing environment.
      redirectUri: window.location.origin
      // postLogoutRedirectUri: '/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
  protectedResourceMap.set('/auth', ['api://a504efbd-7d26-49d0-83b6-97286e45a756/Data.Access']);
  protectedResourceMap.set('/video', ['api://a504efbd-7d26-49d0-83b6-97286e45a756/Data.Access']);
  protectedResourceMap.set('/admin', ['api://a504efbd-7d26-49d0-83b6-97286e45a756/Data.Access']);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ["user.read","api://a504efbd-7d26-49d0-83b6-97286e45a756/Data.Access"],
    },
    loginFailedRoute: "/error",
  };
}

export function xsrfFactory() {
  return new CookieXSRFStrategy("x-xsrf-token", "x-xsrf-token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    { provide: XSRFStrategy, useValue: xsrfFactory }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
