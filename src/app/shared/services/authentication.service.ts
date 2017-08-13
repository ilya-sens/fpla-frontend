import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {GlobalConfig} from "../../global";
import {AlertService} from "./alert.service";
import {GLOBAL_HEADERS} from "../../app.module";
import {DefaultRequestOptions} from "../../default-request-options";

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {}

    login(username: string, password: string) {
        let headers = new Headers({
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        });

        return this.http.get(
            GlobalConfig.BASE_API_URL + '/user',
            {headers: headers})
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
