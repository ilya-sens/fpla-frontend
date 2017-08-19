import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthHttp} from 'angular2-jwt'
import {Observable} from "rxjs/Rx";
import {GlobalConfig} from "../../global";

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
    scenarioModels: Array<ScenarioModel>;
    scriptModels: Array<ScriptModel>;
    // scenarioScriptModels: Array<ScenarioScriptModel>;
    dateFormat: String = GlobalConfig.DATE_FORMAT;

    constructor(private http: AuthHttp,) {
        this.loadData();
    }

    ngOnInit() {
    }

    loadData() {
        Observable.forkJoin([this.getScenarios(), this.getScripts()]).subscribe(
            results => {
                this.scenarioModels = results[0].data;
                this.scriptModels = results[1].data;
                // this.scenarioScriptModels = results[2].data;
            }
        );
    }

    getScriptById(id): ScriptModel {
        return this.scriptModels.find(it => {
            return it.id == id
        });
    }

    // getScenarioScripsByScenarioId(id) {
    //     console.log(this.scenarioScriptModels);
    //     return this.scenarioScriptModels.filter(it => {return it.scenario.id === id});
    // }

    getScenarios() {
        return this.http.get(GlobalConfig.BASE_API_URL + "/scenarios?populate=scenarioScripts").map((res: Response) => res.json());
    }

    // getScenarioScripts() {
    //     return this.http.get(GlobalConfig.BASE_API_URL + "/scenarioScripts").map((res: Response) => res.json());
    // }

    getScripts() {
        return this.http.get(GlobalConfig.BASE_API_URL + "/scripts").map((res: Response) => res.json());
    }

    saveData() {
        this.http.post("http://localhost:8080/api/scenario", {name: "just a script"}).map((res: Response) => res.json());
    }
}
