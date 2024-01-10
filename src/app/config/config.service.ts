import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG_DATA } from './config.consts';
import { AppConfig } from './config.model';

@Injectable({
    deps: [APP_CONFIG_DATA],
    providedIn: 'root',
})
export class AppConfigService {
    readonly auth: AppConfig['auth'];

    constructor(@Inject(APP_CONFIG_DATA) private readonly config: AppConfig) {
        this.auth = this.config.auth;
    }
}
