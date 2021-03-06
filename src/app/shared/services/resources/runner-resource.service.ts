import {Injectable} from '@angular/core';
import {GlobalConfig} from "../../../global";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {ScenarioModel} from "../../model/scenario.model";

@Injectable()
export class RunnerResourceService {

    constructor(
        protected http : AuthHttp
    ) {}

    public getStatus(id?: string, urlSuffix?: string): Observable<any> {
        let url: string = GlobalConfig.BASE_RUNNER_URL + "status";
        url += id ? "/" + id : "";
        url += urlSuffix ? urlSuffix : "";

        return this.http.get(url).map(response => {return response.json()});
    }

    public run_schedule(scenarioModel: ScenarioModel, urlSuffix?: string): Observable<any> {
        let url: string = GlobalConfig.BASE_RUNNER_URL + "scenario/run" + (urlSuffix) ? urlSuffix : "";
        return this.http.post(url, scenarioModel).map(response => {return response.json()});
    }

    public run_scenario(scenarioModel: ScenarioModel, urlSuffix?: string): Observable<any> {
        let url: string = GlobalConfig.BASE_RUNNER_URL + "scenario/run" + (urlSuffix) ? urlSuffix : "";
        return this.http.post(url, scenarioModel).map(response => {return response.json()});
    }

    public stop(id: string) {
        return this.http.get(GlobalConfig.BASE_RUNNER_URL + "stop/" + id)
            .map(response => {return response.json()});
    }
}
