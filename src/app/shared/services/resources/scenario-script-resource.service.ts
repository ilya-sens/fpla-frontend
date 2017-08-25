import {Injectable} from '@angular/core';
import {AbstractResourceService} from "./abstract-resource.service";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ScenarioScriptResourceService extends AbstractResourceService {
    constructor(protected http: AuthHttp) {
        super(http, 'scenarioscripts')
    }
}
