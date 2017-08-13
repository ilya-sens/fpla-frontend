import {BaseRequestOptions, RequestOptionsArgs, RequestOptions, Headers} from "@angular/http";
import {Router} from "@angular/router"
import {Injectable} from "@angular/core";

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    constructor(private router: Router) {
        super();
    }

    headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    merge(options?: RequestOptionsArgs): RequestOptions {
        let newOptions = super.merge(options);
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            newOptions.headers.set('Authorization', 'Basic ' + user.token);
        } else {
            this.router.navigate(['/login']);
        }
        return newOptions;
    }

}
