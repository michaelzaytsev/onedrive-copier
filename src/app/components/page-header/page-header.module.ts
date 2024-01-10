import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
    imports: [ButtonModule, CommonModule],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
