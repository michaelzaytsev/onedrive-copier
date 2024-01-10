import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OneDriveChildrenResponse, OneDriveDrive, OneDriveDriveItem, OneDriveSharedDriveItem } from './onedrive.types';

const MICROSOFT_GRAPH_BASE_URI = 'https://graph.microsoft.com/v1.0/me';

@Injectable()
export class OneDriveService {
    constructor(private http: HttpClient) {}

    readRootDrive(accessToken: string): Observable<OneDriveDrive> {
        return this.http.get(this.url('/drive'), {
            headers: {
                Authorization: this.authorization(accessToken),
            },
        }) as Observable<OneDriveDrive>;
    }

    readRootDriveItems(accessToken: string): Observable<OneDriveChildrenResponse<OneDriveDriveItem>> {
        return this.http.get(this.url('/drive/root/children'), {
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

    private url(path: string): string {
        return MICROSOFT_GRAPH_BASE_URI + path;
    }

    private authorization(accessToken: string): string {
        return `Bearer ${accessToken}`;
    }
}
