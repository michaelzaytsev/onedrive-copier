import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ModuleRoute, RedirectRoute } from '../../shared/factories/route.factory';

const routes: Routes = [
    new ModuleRoute('tasks', () => import('./tasks/tasks.module').then(m => m.TasksRouteModule), [MsalGuard]),
    new RedirectRoute('', 'tasks', 'full'),
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutesModule {}
