import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {GlobalConfig} from "../../global";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";
import {ScriptResourceService} from "../../shared/services/resources/script-resource.service";
import {ScenarioResourceService} from "../../shared/services/resources/scenario-resource.service";
import {ScenarioScriptResourceService} from "../../shared/services/resources/scenario-script-resource.service";
import {ScenarioModel} from "../../shared/model/scenario.model";
import {ScriptModel} from "../../shared/model/script.model";
import {ScenarioScriptModel} from "../../shared/model/scenario-script.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss'],
    providers: [ScriptResourceService, ScenarioResourceService, ScenarioScriptResourceService]
})
export class ScenarioComponent implements OnInit {
    scenarios: Array<ScenarioModel>;
    scripts: Array<ScriptModel>;
    scenarioScripts: Array<ScenarioScriptModel>;

    sub: any;

    typeEnum = TypeEnum;
    private watchingScenarios: Array<number> = [];

    constructor(private scriptResource: ScriptResourceService,
                private scenarioResource: ScenarioResourceService,
                private scenarioScriptResource: ScenarioScriptResourceService,
                private route: ActivatedRoute,) {
    }

    ngOnInit(): void {
        this.sub = this.route.data.subscribe(ignore => {
            this.loadData();
        });
    }

    loadData() {
        Observable.forkJoin([
            this.scenarioResource.get(),
            this.scriptResource.get(),
            this.scenarioScriptResource.get(),
        ]).subscribe(
            results => {
                this.scenarios = results[0].data;
                this.scripts = results[1].data;
                this.scenarioScripts = results[2].data;
            }
        );
    }

    createScenario() {
        let scenario: ScenarioModel = new ScenarioModel();
        this.scenarioResource.create(scenario).subscribe(ignore => {
            this.loadData();
        });
    }

    watchingScenario(scenario: ScenarioModel) {
        return this.watchingScenarios.indexOf(scenario.id) > -1;
    }

    switchWatchScenario(scenario: ScenarioModel) {
        let index: number = this.watchingScenarios.indexOf(scenario.id);
        if (index > -1) {
            this.watchingScenarios.splice(index, 1);
        } else {
            this.watchingScenarios.push(scenario.id);
        }
    }
}
