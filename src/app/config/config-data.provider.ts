import { environment } from '../../environments/environment';
import { APP_CONFIG_DATA } from './config.consts';
import { AppConfig } from './config.model';

export const configDataProvider = (config: AppConfig) => ({
    provide: APP_CONFIG_DATA,
    useValue: config,
});

export async function loadConfig(): Promise<AppConfig> {
    const filepath = `/assets/config/${environment.name}.config.json`;
    const response = await fetch(filepath);
    return response.json();
}
