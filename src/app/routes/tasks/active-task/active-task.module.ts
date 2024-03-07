import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../../../shared/shared.module';
import { ActiveTaskComponent } from './active-task.component';

@NgModule({
    imports: [CommonModule, ProgressBarModule, ToastModule, SharedModule],
    declarations: [ActiveTaskComponent],
    exports: [ActiveTaskComponent],
})
export class ActiveTaskModule {}
