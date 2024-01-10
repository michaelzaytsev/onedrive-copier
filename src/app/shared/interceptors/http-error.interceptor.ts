import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorTitle: string;
                let errorMessage: string;
                if (error.error instanceof ErrorEvent) {
                    errorTitle = 'Client error';
                    errorMessage = error.error.message;
                } else {
                    errorTitle = `Error ${error.status}`;
                    errorMessage = error.message;
                }
                this.messageService.add({
                    severity: 'error',
                    summary: errorTitle,
                    detail: errorMessage,
                });
                return throwError(() => error);
            }),
        );
    }
}
