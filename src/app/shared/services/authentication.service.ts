import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {GlobalConfig} from "../../global";

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {}

    login(username: string, password: string) {

        return this.http.post(
            GlobalConfig.BASE_BACKEND_URL + '/auth/signin', {'email': username, 'password': password})
            .map((response: Response) => {
                let user = response.json().data;
                if (user && user.token) {
                    sessionStorage.setItem('token', user.token);
                    localStorage.setItem('currentUser', JSON.stringify(user.data));
                }
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
    }
}
