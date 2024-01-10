import { InjectionToken } from '@angular/core';
import { AppConfig } from './config.model';

export const APP_CONFIG_DATA = new InjectionToken<AppConfig>('APP_CONFIG_DATA');
