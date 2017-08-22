import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {GlobalConfig} from "../../global";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";
import {AlertService} from "../../shared/services/alert.service";
import {DropEvent} from "ng2-drag-drop";
import {ScriptResourceService} from "./script-resource.service";
import {ScenarioResourceService} from "./scenario-resource.service";
import {ScenarioScriptResourceService} from "./scenario-script-resource.service";
import {ScenarioModel} from "./scenario.model";
import {ScriptModel} from "./script.model";
import {ScenarioScriptModel} from "./scenario-script.model";

import * as _ from 'lodash';

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

    dateFormat: String = GlobalConfig.DATE_FORMAT;
    typeEnum = TypeEnum;

    constructor(private alertService: AlertService,
                private scriptResource: ScriptResourceService,
                private scenarioResource: ScenarioResourceService,
                private scenarioScriptResource: ScenarioScriptResourceService,) {
        this.loadData();
    }

    ngOnInit() {
    }

    loadData() {
        Observable.forkJoin([
            this.scenarioResource.getAll(),
            this.scriptResource.getAll(),
            this.scenarioScriptResource.getAll()
        ]).subscribe(
            results => {
                this.scenarios = results[0].data;
                this.scripts = results[1].data;
                this.scenarioScripts = results[2].data;
            }
        );
    }

    getScenarioScriptsOfScenario(scenarioId): Array<ScenarioScriptModel> {
        return _.filter(this.scenarioScripts, it => {return it.scenario == scenarioId});
    }

    getScriptById(id): ScriptModel {
        return this.scripts.find(it => { return it.id == id});
    }

    updateScenario(scenario) {
        this.scenarioResource.update(scenario).subscribe(result => {
            this.loadData();
            this.alertService.success(result.message);
        });
    }

    updateScript(script) {
        this.scriptResource.update(script).subscribe(result => {
                this.loadData();
                this.alertService.success(result.message);
            }
        )
    }

    changeIndex($event: DropEvent, index: number) {
        let scenarioScriptModel = $event.dragData as ScenarioScriptModel;
        if (scenarioScriptModel.index != index) {
            let scenarioScriptsOfScenario = this.scenarioScripts.filter(it => {
                return it.scenario == scenarioScriptModel.scenario
            });
            scenarioScriptsOfScenario.forEach(it => {
                if (it.id == scenarioScriptModel.id) {
                    it.index = index;
                } else if (it.index >= index) {
                    it.index++;
                }
            });
            this.checkIndexStart(scenarioScriptsOfScenario);
            this.loadData();
        }
    }

    createScenario() {
        let scenario: ScenarioModel = new ScenarioModel();
        this.scenarioResource.create(scenario).subscribe(ignore => {
            this.loadData();
        });
    }

    createScript(scenarioIndex) {
        let script: ScriptModel = new ScriptModel();
        this.scriptResource.create(script).subscribe(result => {
            script = result.data
        });
        let scenario: ScenarioModel = this.scenarios[scenarioIndex];
        this.createScenarioScript(scenario, script);
        this.loadData();
    }

    addScript(scenarioIndex, scriptIndex) {
        let script: ScriptModel = this.scripts[scriptIndex];
        let scenario: ScenarioModel = this.scenarios[scenarioIndex];
        this.createScenarioScript(scenario, script);
        this.loadData();
    }

    private createScenarioScript(scenario, script) {
        let obj =  _.filter(this.scenarioScripts, it => {return it.scenario == scenario.id});
        let maxIndex = _.isEmpty(obj) ? 0 : _.maxBy(obj, 'index').index;
        let scenarioScript = new ScenarioScriptModel(scenario, script);
        scenarioScript.index = Number(maxIndex) ? Number(maxIndex) : 0;
        this.scenarioScriptResource.create(scenarioScript).subscribe();
    }

    private checkIndexStart(scenarioScripts: Array<ScenarioScriptModel>) {
        let minIndex = Math.min.apply(Math, scenarioScripts.map(it => {
            return it.index
        }));
        if (minIndex > 0) {
            scenarioScripts.forEach(it => {
                it.index--
            })
        }
        scenarioScripts.forEach(it => {
            this.scenarioScriptResource.update(it).subscribe();
        });
    }

    log() {
        // console.log(this.scenarios);
        // console.log(this.scenarioScripts);
        this.scriptResource.getAll().subscribe(it => {
            console.log(it)
        });
    }
}
