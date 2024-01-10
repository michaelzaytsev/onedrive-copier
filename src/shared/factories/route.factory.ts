import { Route as RouteInterface } from '@angular/router';

export class RedirectRoute implements RouteInterface {
    constructor(
        public path: RouteInterface['path'],
        public redirectTo: RouteInterface['redirectTo'],
        public pathMatch: RouteInterface['pathMatch'],
    ) {}
}

export class ModuleRoute implements RouteInterface {
    constructor(
        public path: RouteInterface['path'],
        public loadChildren: RouteInterface['loadChildren'],
        public canActivateChild?: RouteInterface['canActivateChild'],
    ) {}
}

export class ComponentRoute implements RouteInterface {
    constructor(
        public path: RouteInterface['path'],
        public component: RouteInterface['component'],
        public canActivate?: RouteInterface['canActivate'],
    ) {}
}
