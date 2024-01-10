import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentRoute } from '../../../shared/factories/route.factory';
import { TasksRouteComponent } from './tasks.component';

@NgModule({
    imports: [RouterModule.forChild([new ComponentRoute('', TasksRouteComponent)])],
    exports: [RouterModule],
})
export class TasksRouterModule {}
