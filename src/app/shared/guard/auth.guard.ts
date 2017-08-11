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
        let user = JSON.parse(localStorage.getItem('currentUser'));
        let lastCheck: number = +JSON.parse(localStorage.getItem('lastAuthCheck'));
        let currentDate: number = new Date().getTime();
        if (lastCheck && lastCheck + 60 * 1000 > currentDate) {
            return true;
        }
        if (user) {
            this.authService.isLoggedIn(user.token).subscribe(
            data => {
                if (data.user.token == user.token) {
                    localStorage.setItem('lastAuthCheck', ""+currentDate);
                    return true;
                }
            }, error => {
                this.alertService.error(error);
            });
        }

        this.router.navigate(['/login']);
        return false;
    }

}
