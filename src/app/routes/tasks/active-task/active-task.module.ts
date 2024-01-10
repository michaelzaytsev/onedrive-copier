import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveTaskComponent } from './active-task.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ActiveTaskComponent],
    exports: [ActiveTaskComponent],
})
export class ActiveTaskModule {}
