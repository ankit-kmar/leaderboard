import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

import {LoginService} from '../../login/login.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot,
    ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        if (this.loginService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/', 'login']);
            return false;
        }
    }
}
