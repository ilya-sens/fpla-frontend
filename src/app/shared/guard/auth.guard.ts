import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private alertService: AlertService,
    ) {}

    canActivate() {
        let token = sessionStorage.getItem('token');
        if (token) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
