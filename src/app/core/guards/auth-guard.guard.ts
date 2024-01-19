import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from "@angular/core";

export const authGuardGuard: CanActivateFn = (route, state): boolean | UrlTree => {


    if (localStorage.getItem('UserId')) {
        return inject(Router).createUrlTree(['home']);
    }

    return true;
}
