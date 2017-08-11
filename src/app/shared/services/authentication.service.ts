import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {GlobalConfig} from "../../global";
import {AlertService} from "./alert.service";

@Injectable()
export class AuthenticationService {

    constructor(private http: Http, private alertService: AlertService) {
    }

    headers = new Headers({
        'Content-Type': 'application/json'
    });


    login(username: string, password: string) {
        return this.http.post(
                GlobalConfig.BASE_API_URL + '/users/login',
                JSON.stringify({ user: {email: username, password: password}}),
                {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json().user;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }


    isLoggedIn(token: string) {
        return this.http.get(GlobalConfig.BASE_API_URL + '/user',
            {'headers': new Headers({ 'Authorization': 'Token ' + token })
            }).map((response: Response) => response.json());
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
