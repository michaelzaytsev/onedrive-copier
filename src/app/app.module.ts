import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { AppAuthModule } from './auth/auth.module';
import { PageHeaderModule } from './components/page-header/page-header.module';
import { AppConfigModule } from './config/config.module';
import { AppRoutesModule } from './routes/routes.module';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

@NgModule({
    imports: [
        AppAuthModule,
        AppConfigModule,
        AppRoutesModule,
        BrowserAnimationsModule,
        BrowserModule,
        PageHeaderModule,
        TabMenuModule,
        ToastModule,
    ],
    providers: [
        MessageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
