import { Injectable } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { AsyncSubject, BehaviorSubject, filter } from 'rxjs';
import { AppConfigService } from '../config/config.service';

@Injectable({ providedIn: 'root' })
export class AppAuthService {
    readonly account$ = new BehaviorSubject<AccountInfo | null>(null);
    accessToken$ = new AsyncSubject<string>();

    constructor(
        private broadcast: MsalBroadcastService,
        private config: AppConfigService,
        private msal: MsalService,
    ) {
        this.subscribeMsalEvents();
        this.subscribeProgress();
    }

    logout(): void {
        this.msal.logout();
    }

    getAccessToken$(): AsyncSubject<string> {
        if (
            !this.accessTokenAcquiring &&
            (!this.accessTokenExpiresAt || this.accessTokenExpiresAt.getTime() < Date.now() - 5e3)
        ) {
            this.accessTokenAcquiring = true;
            this.accessToken$ = new AsyncSubject<string>();
            this.msal
                .acquireTokenSilent({
                    scopes: this.config.auth.scopes,
                    account: this.msal.instance.getAllAccounts()[0],
                })
                .subscribe(result => {
                    this.accessTokenExpiresAt = result.expiresOn!;
                    this.accessToken$.next(result.accessToken);
                    this.accessToken$.complete();
                    this.accessTokenAcquiring = false;
                });
        }
        return this.accessToken$;
    }

    private accessTokenExpiresAt?: Date;
    private accessTokenAcquiring = false;

    private subscribeMsalEvents(): void {
        this.broadcast.msalSubject$.subscribe((event: EventMessage) => {
            if (event.eventType === EventType.LOGIN_SUCCESS) {
                this.account$.next(event.payload as AccountInfo);
            }
        });
    }

    private subscribeProgress(): void {
        this.broadcast.inProgress$.pipe(filter(status => status === InteractionStatus.None)).subscribe(() => {
            const accounts = this.msal.instance.getAllAccounts();
            this.account$.next(accounts[0]);
        });
    }
}
