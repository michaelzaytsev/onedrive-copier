import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
    MSAL_GUARD_CONFIG,
    MSAL_INSTANCE,
    MSAL_INTERCEPTOR_CONFIG,
    MsalBroadcastService,
    MsalGuard,
    MsalInterceptor,
    MsalModule,
    MsalRedirectComponent,
    MsalService,
} from '@azure/msal-angular';
import { AppConfigService } from '../config/config.service';
import { msalGuardConfigFactory, msalInstanceFactory, msalInterceptorConfigFactory } from './auth.factory';
import { AppAuthService } from './auth.service';

@NgModule({
    imports: [MsalModule],
    providers: [
        AppAuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true,
        },
        {
            provide: MSAL_INSTANCE,
            useFactory: msalInstanceFactory,
            deps: [AppConfigService],
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: msalGuardConfigFactory,
            deps: [AppConfigService],
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: msalInterceptorConfigFactory,
            deps: [AppConfigService],
        },
        MsalBroadcastService,
        MsalGuard,
        MsalService,
    ],
    bootstrap: [MsalRedirectComponent],
})
export class AppAuthModule {}
