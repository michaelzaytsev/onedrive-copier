import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { OneDriveDriveTypeSelectComponent } from './onedrive-drive-type-select.component';

@NgModule({
    imports: [FormsModule, SelectButtonModule],
    declarations: [OneDriveDriveTypeSelectComponent],
    exports: [OneDriveDriveTypeSelectComponent],
})
export class OneDriveDriveTypeSelectModule {}
