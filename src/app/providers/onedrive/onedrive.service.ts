import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
    OneDriveChildrenResponse,
    OneDriveDriveItem,
    OneDriveDriveItemCopyProgress,
    OneDriveSharedDriveItem,
} from './onedrive.types';

const MICROSOFT_GRAPH_BASE_URI = 'https://graph.microsoft.com/v1.0';

@Injectable()
export class OneDriveService {
    constructor(private http: HttpClient) {}

    readRootDriveItems(accessToken: string): Observable<OneDriveChildrenResponse<OneDriveDriveItem>> {
        return this.http.get(this.url('/me/drive/root/children'), {
            headers: {
                Authorization: this.authorization(accessToken),
            },
        }) as Observable<OneDriveChildrenResponse<OneDriveDriveItem>>;
    }

    readSharedWithMeDriveItems(accessToken: string): Observable<OneDriveChildrenResponse<OneDriveSharedDriveItem>> {
        return this.http.get(this.url('/drive/sharedWithMe'), {
            headers: {
                Authorization: this.authorization(accessToken),
            },
        }) as Observable<OneDriveChildrenResponse<OneDriveSharedDriveItem>>;
    }

    readDriveItemChildren(
        driveId: string,
        driveItemId: string,
        accessToken: string,
    ): Observable<OneDriveChildrenResponse<OneDriveDriveItem>> {
        return this.http.get(this.url(`/drives/${driveId}/items/${driveItemId}/children`), {
            headers: {
                Authorization: this.authorization(accessToken),
            },
        }) as Observable<OneDriveChildrenResponse<OneDriveDriveItem>>;
    }

    copyDriveItem(
        sourceDriveId: string,
        sourceDriveItemId: string,
        targetDriveId: string,
        targetDriveItemId: string,
        accessToken: string,
    ): Observable<string> {
        return this.http
            .post(
                this.url(`/drives/${sourceDriveId}/items/${sourceDriveItemId}/copy`),
                {
                    parentReference: {
                        driveId: targetDriveId,
                        id: targetDriveItemId,
                    },
                },
                {
                    headers: {
                        Authorization: this.authorization(accessToken),
                        'Content-Type': 'application/json',
                    },
                    observe: 'response',
                },
            )
            .pipe(map(response => response.headers.get('Location'))) as Observable<string>;
    }

    checkDriveItemCopyProgress(monitorLink: string): Observable<OneDriveDriveItemCopyProgress> {
        return this.http.get(monitorLink) as Observable<OneDriveDriveItemCopyProgress>;
    }

    private url(path: string): string {
        return MICROSOFT_GRAPH_BASE_URI + path;
    }

    private authorization(accessToken: string): string {
        return `Bearer ${accessToken}`;
    }
}
