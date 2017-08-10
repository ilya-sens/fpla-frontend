import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    headers = new Headers({
        'Content-Type': 'application/json'
    });

    login(username: string, password: string) {
        return this.http.post(
                'http://localhost:8080/api/users/login',
                JSON.stringify({user: { email: username, password: password }}),
                {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json().user;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(localStorage.getItem('currentUser'));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
