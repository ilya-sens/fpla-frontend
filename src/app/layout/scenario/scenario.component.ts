import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {GlobalConfig} from "../../global";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";
import {AlertService} from "../../shared/services/alert.service";
import {DropEvent} from "ng2-drag-drop";
import {ScriptResourceService} from "./script-resource.service";
import {ScenarioResourceService} from "./scenario-resource.service";
import {ScenarioScriptResourceService} from "./scenario-script-resource.service";

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss'],
    providers: [ScriptResourceService, ScenarioResourceService, ScenarioScriptResourceService]
})
export class ScenarioComponent implements OnInit {
    scenarioModels: Array<ScenarioModel>;
    scriptModels: Array<ScriptModel>;
    scenarioScriptModels: Array<ScenarioScriptModel>;

    dateFormat: String = GlobalConfig.DATE_FORMAT;
    typeEnum = TypeEnum;

    constructor(
        private alertService: AlertService,
        private scriptResource: ScriptResourceService,
        private scenarioResource: ScenarioResourceService,
        private scenarioScriptResource: ScenarioScriptResourceService,
    ) {
        this.loadData();
    }

    ngOnInit() {
    }

    loadData() {
        Observable.forkJoin([
            this.scenarioResource.getAll("?populate=scenarioScripts"),
            this.scriptResource.getAll(),
            this.scenarioScriptResource.getAll()
        ]).subscribe(
            results => {
                this.scenarioModels = results[0].data;
                this.scriptModels = results[1].data;
                this.scenarioScriptModels = results[2].data;
            }
        );
    }

    getScriptById(id): ScriptModel {
        return this.scriptModels.find(it => {
            return it.id == id
        });
    }

    updateScenario(scenario: ScenarioModel) {
        this.scenarioResource.update(scenario).subscribe(result => {
            this.loadData();
            this.alertService.success(result.message);
        });
    }

    updateScript(script: ScriptModel) {
        this.scriptResource.update(script).subscribe(result => {
                this.loadData();
                this.alertService.success(result.message);
            }
        )
    }

    changeIndex($event: DropEvent, index: number) {
        let scenarioScriptModel = $event.dragData as ScenarioScriptModel;
        if (scenarioScriptModel.index != index) {
            var scenarioScriptsOfScenario = this.scenarioScriptModels.filter(it => {
                return it.scenario == scenarioScriptModel.scenario
            });
            scenarioScriptsOfScenario.forEach(it => {
                if (it.id == scenarioScriptModel.id) {
                    it.index = index;
                } else if (it.index >= index) {
                    it.index++;
                }
            });
            let minIndex = Math.min.apply(Math, scenarioScriptsOfScenario.map(it => {
                return it.index
            }));
            if (minIndex > 0) {
                scenarioScriptsOfScenario.forEach(it => {
                    it.index--
                })
            }
            scenarioScriptsOfScenario.forEach(it => {
                this.scenarioScriptResource.update(it).subscribe();
            });
            console.log(minIndex);
            this.loadData();
        }
    }

    log() {
        console.log(this.scenarioModels);
        console.log(this.scenarioScriptModels);
        this.scriptResource.getAll().subscribe(it => {console.log(it) });
    }

}
