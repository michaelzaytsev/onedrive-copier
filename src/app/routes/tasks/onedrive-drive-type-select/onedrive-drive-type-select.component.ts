import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OneDriveDriveType } from '../onedrive-explore-table/onedrive-explore-table.types';

@Component({
    selector: 'app-onedrive-drive-type-select',
    templateUrl: './onedrive-drive-type-select.component.html',
})
export class OneDriveDriveTypeSelectComponent {
    @Input()
    disabled?: boolean;

    @Input()
    value!: OneDriveDriveType;

    @Output()
    valueChange = new EventEmitter<OneDriveDriveType>();

    protected options: { label: string; icon: string; value: OneDriveDriveType }[] = [
        { label: 'Personal', icon: 'pi pi-user', value: OneDriveDriveType.Root },
        { label: 'Shared', icon: 'pi pi-users', value: OneDriveDriveType.SharedWithMe },
    ];

    protected handleChange(value: OneDriveDriveType) {
        this.valueChange.emit(value);
    }
}
