import { Component, Input } from '@angular/core';
import { AppAuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
    @Input()
    title!: string;

    constructor(private auth: AppAuthService) {
        this.auth.account$.subscribe(account => {
            if (account) {
                this.email = account.username;
                this.name = account.name!;
            }
        });
    }

    protected email?: string;
    protected name?: string;

    protected handleLogout(): void {
        this.auth.logout();
    }
}
