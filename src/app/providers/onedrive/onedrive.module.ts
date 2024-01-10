import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OneDriveService } from './onedrive.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [OneDriveService],
})
export class OneDriveModule {}
