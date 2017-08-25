import {Injectable} from '@angular/core';
import {GlobalConfig} from "../../../global";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AbstractResourceService {
    protected url : string = GlobalConfig.BASE_API_URL + "/" + this.name;

    constructor(
        protected http : AuthHttp,
        public name: string
    ) {}

    public get(id?: number, urlSuffix?: string): Observable<any> {
        let url: string = this.url;
        if (id) url += "/" + id;
        if (urlSuffix) url += urlSuffix;
        return this.http.get(url).map(response => {return response.json()});
    }

    public create(model: any, urlSuffix?: string): Observable<any> {
        return this.http.post(urlSuffix ? this.url + urlSuffix : this.url, model)
            .map(response => {return response.json()});
    }

    public update(model: any, urlSuffix?: string): Observable<any> {
        return this.http.put(urlSuffix ? this.url + "/" + model.id + urlSuffix : this.url  + "/" + model.id, model)
            .map(response => {return response.json()});
    }

    public remove(model: any, urlSuffix?: string): Observable<any> {
        return this.http.delete(urlSuffix ? this.url + "/" + model.id + urlSuffix : this.url  + "/" + model.id)
            .map(response => {return response.json()});
    }
}
