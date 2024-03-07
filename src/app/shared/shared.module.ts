import { NgModule } from '@angular/core';
import { FileSizePipe } from './pipes/file-size.pipe';
import { TimeDiffPipe } from './pipes/time-diff.pipe';

@NgModule({
    declarations: [FileSizePipe, TimeDiffPipe],
    exports: [FileSizePipe, TimeDiffPipe],
})
export class SharedModule {}
