import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { AppConfigService } from '../config/config.service';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const msalInstanceFactory = (config: AppConfigService) =>
    new PublicClientApplication({
        auth: {
            clientId: config.auth.clientId,
            authority: 'https://login.microsoftonline.com/common',
            redirectUri: config.auth.redirectUri,
            postLogoutRedirectUri: config.auth.postLogoutRedirectUri,
        },
        cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: isIE,
        },
        system: {
            loggerOptions: {
                loggerCallback: () => {},
                piiLoggingEnabled: false,
            },
        },
    });

export const msalGuardConfigFactory = (config: AppConfigService): MsalGuardConfiguration => ({
    interactionType: InteractionType.Redirect,
    authRequest: {
        scopes: config.auth.scopes,
    },
});

export const msalInterceptorConfigFactory = (config: AppConfigService): MsalInterceptorConfiguration => ({
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map(config.auth.protectedResourceMap),
});
