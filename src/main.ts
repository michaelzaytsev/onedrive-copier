import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { configDataProvider, loadConfig } from './app/config/config-data.provider';

(async () => {
    try {
        const config = await loadConfig();
        platformBrowserDynamic([configDataProvider(config)])
            .bootstrapModule(AppModule)
            .catch(err => console.error(err));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
