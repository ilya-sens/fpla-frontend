import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt'
import {Observable} from "rxjs/Rx";
import {GlobalConfig} from "../../global";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";
import {AlertService} from "../../shared/services/alert.service";

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
    scenarioModels: Array<ScenarioModel>;
    scriptModels: Array<ScriptModel>;

    dateFormat: String = GlobalConfig.DATE_FORMAT;
    typeEnum = TypeEnum;

    constructor(private http: AuthHttp,
                private alertService: AlertService) {
        this.loadData();
    }

    ngOnInit() {
    }

    loadData() {
        Observable.forkJoin([this.sendGetScenariosRequest(), this.sendGetScriptsRequest()]).subscribe(
            results => {
                this.scenarioModels = results[0].data;
                this.scriptModels = results[1].data;
            }
        );
    }

    getScriptById(id): ScriptModel {
        return this.scriptModels.find(it => {
            return it.id == id
        });
    }

    updateScenario(scenario: ScenarioModel) {
        this.sendUpdateScenarioRequest(scenario).subscribe(result => {
            this.loadData();
            this.alertService.success(result.message);
        });
    }

    updateScript(script: ScriptModel) {
        this.sendUpdateScriptRequest(script).subscribe(result => {
                this.loadData();
                this.alertService.success(result.message);
            }
        )
    }

    private sendGetScenariosRequest() {
        return this.http.get(GlobalConfig.BASE_API_URL + "/scenarios?populate=scenarioScripts").map((res: Response) => res.json());
    }

    private sendCreateScenarioRequest(scenario) {
        return this.http.post(GlobalConfig.BASE_API_URL + "/scenarios", scenario).map((res: Response) => res.json());
    }

    private sendUpdateScenarioRequest(scenario: ScenarioModel) {
        return this.http.put(GlobalConfig.BASE_API_URL + "/scenarios/" + scenario.id, scenario)
            .map((res: Response) => res.json());
    }

    private sendGetScriptsRequest() {
        return this.http.get(GlobalConfig.BASE_API_URL + "/scripts").map((res: Response) => res.json());
    }

    private sendUpdateScriptRequest(script: ScriptModel) {
        return this.http.put(GlobalConfig.BASE_API_URL + "/scripts/" + script.id, script).map((res: Response) => res.json());
    }

    log() {
        console.log(this.scenarioModels);
    }

}
