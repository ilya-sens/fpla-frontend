import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {ScriptResourceService} from "../../shared/services/resources/script-resource.service";
import {ScenarioResourceService} from "../../shared/services/resources/scenario-resource.service";
import {ScenarioScriptResourceService} from "../../shared/services/resources/scenario-script-resource.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../shared/services/alert.service";
import {AuthHttp} from "angular2-jwt";
import {ScenarioModel} from "../../shared/model/scenario.model";
import {GlobalConfig} from "../../global";

import * as _ from 'lodash';
import {ScenarioScriptModel} from "../../shared/model/scenario-script.model";
import {ScriptModel} from "../../shared/model/script.model";
import {DropEvent} from "ng2-drag-drop";
import {Observable} from "rxjs/Observable";
import {RunnerListTypesEnum} from "../runner/runner.component";

@Component({
    selector: 'app-scenario-details',
    templateUrl: './scenario-details.component.html',
    styleUrls: ['./scenario-details.component.scss'],
    providers: [ScriptResourceService, ScenarioResourceService, ScenarioScriptResourceService]
})
export class ScenarioDetailsComponent implements OnInit, OnDestroy {
    @Input() scenario: ScenarioModel;
    @Input() scripts: Array<ScriptModel>;
    @Input() scenarioScripts: Array<ScenarioScriptModel>;
    @Input() full: boolean = true;
    @Input() loadFromOutside: boolean = false;
    @Output() scenarioChanged: EventEmitter<ScenarioModel> = new EventEmitter();
    @Output() reloadScripts: EventEmitter<Boolean> = new EventEmitter();
    @Output() scriptsChanged: EventEmitter<Array<ScriptModel>> = new EventEmitter();
    @Output() scenarioScriptsChanged: EventEmitter<Array<ScenarioScriptModel>> = new EventEmitter();

    sub: any;
    id: number;

    runnerListTypes = RunnerListTypesEnum;
    dateFormat: String = GlobalConfig.DATE_FORMAT;

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            if (!this.loadFromOutside) {
                this.id = +params['id'];
                this.loadData();
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    constructor(private alertService: AlertService,
                private scriptResource: ScriptResourceService,
                private http: AuthHttp,
                private route: ActivatedRoute,
                private scenarioResource: ScenarioResourceService,
                private scenarioScriptResource: ScenarioScriptResourceService,) {
    }

    loadData() {
        Observable.forkJoin(
            this.scenarioResource.get(this.id),
            this.scenarioScriptResource.get(),
            this.scriptResource.get(),
        ).subscribe(results => {
            this.scenario = results[0].data;
            this.scenarioScripts = results[1].data;
            this.scripts = results[2].data;
        });
    }

    loadScripts() {
        Observable.forkJoin([
            this.scriptResource.get(),
            this.scenarioScriptResource.get(),
        ]).subscribe(
            results => {
                this.scripts = results[0].data;
                this.scenarioScripts = results[1].data;
            }
        );
    }

    generateScenarioFile(scenario: ScenarioModel) {
        this.scenarioResource.get(scenario.id, "/generate").subscribe(ignore => {
            this.scenarioResource.get(scenario.id).subscribe(updatedScenario => {
                this.scenario = updatedScenario.data;
            });
        })
    }

    uploadScenarioFile(scenario: ScenarioModel) {
        this.http.post(GlobalConfig.BASE_RUNNER_URL + "scenario/upload", scenario).subscribe();
    }

    runScenarioFile(scenario: ScenarioModel) {
        this.http.post(GlobalConfig.BASE_RUNNER_URL + "scenario/run", scenario)
            .map(response => {
                return response.json()
            })
            .subscribe(result => {
                if (result.status == "false") {
                    scenario.runningThreads = result.thread_id
                } else {
                    scenario._errorMessage = result.message
                }
            });
    }

    getScenarioScriptsOfScenario(scenarioId): Array<ScenarioScriptModel> {
        return _.filter(this.scenarioScripts, it => {
            return it.scenario == scenarioId
        });
    }

    getScriptById(id): ScriptModel {
        return this.scripts.find(it => {
            return it.id == id
        });
    }

    updateScenario(scenario) {
        this.scenarioResource.update(scenario).subscribe(result => {
            scenario = result.data;
            this.scenarioChanged.emit(scenario);
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

    createScript(scenario) {
        let script: ScriptModel = new ScriptModel();
        this.scriptResource.create(script).subscribe(result => {
            script = result.data
        });
        this.createScenarioScript(scenario, script);
        this.scenarioScriptsChanged.next(this.scenarioScripts);
        this.scriptsChanged.next(this.scripts);
        // this.loadData();
        this.loadScripts();
    }

    addScript(scenario, scriptIndex) {
        let script: ScriptModel = this.scripts[scriptIndex];
        this.createScenarioScript(scenario, script);
        this.loadScripts();
        // this.loadData();
    }

    deleteScenarioScript(scenarioScript) {
        this.scenarioScriptResource.remove(scenarioScript).subscribe(ignore => {
            this.loadData();
        });
    }

    deleteScript(script) {
        this.scriptResource.remove(script).subscribe(ignore => {
            this.loadData();
        });
    }

    deleteScenario(scenario: ScenarioModel) {
        this.scenarioResource.remove(scenario).subscribe(ignore => {
            this.loadData()
        })
    }

    private createScenarioScript(scenario, script) {
        let obj = _.filter(this.scenarioScripts, it => {
            return it.scenario == scenario.id
        });
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

}
