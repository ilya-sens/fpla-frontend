import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {routerTransition} from '../router.animations';
// import {AuthenticationService} from "../shared/services/authentication.service";
import {AlertService} from "../shared/services/alert.service";
import {AuthenticationService} from "../shared/services/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
    providers: [AuthenticationService, AlertService]
})
export class LoginComponent implements OnInit {
    //
    // constructor(public router: Router) {
    // }
    //
    // ngOnInit() {
    // }
    //
    // onLoggedin() {
    //     localStorage.setItem('isLoggedin', 'true');
    // }

    model: any = {};
    loading = false;
    returnUrl: string = '/dashboard';

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onLogin() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    console.log(this.returnUrl);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
