import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ScenarioModel} from "../../shared/model/scenario.model";
import {Observable} from "rxjs/Rx";
import {RunnerResourceService} from "../../shared/services/resources/runner-resource.service";
import {ScenarioResourceService} from "../../shared/services/resources/scenario-resource.service";

import * as _ from "lodash";
import {ThreadModel} from "../../shared/model/thread.model";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-runner',
    templateUrl: './runner.component.html',
    styleUrls: ['./runner.component.scss'],
})
export class RunnerComponent implements OnInit, OnDestroy {
    // @Input() scenario: ScenarioModel;
    scenarios: Array<ScenarioModel>;
    threads: Array<ThreadModel> = [];

    openedDetails: Array<string> = [];

    sub: any;

    constructor(private runnerResource: RunnerResourceService,
                private scenarioResource: ScenarioResourceService,
                ) {
    }

    ngOnInit(): void {
        this.sub = Observable.timer(0, 3000).map(() => this.getRunnerStatus()).subscribe();
        this.scenarioResource.get().subscribe(result => this.scenarios = result.data);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getRunnerStatus() {
        this.runnerResource.getStatus().subscribe(result => {
            result.forEach(resultThread => {
                // let found = _.some(this.threads, _.matches(resultThread));
                let found = this.threads.find(it => {
                    return it.runningThread == resultThread.runningThread
                });
                if (found) {
                    console.log("found runningThread");
                    if (found.line != resultThread.line) found.line = resultThread.line;
                    if (found.exceptions != resultThread.exceptions) found.exceptions = resultThread.exceptions;
                } else {
                    this.threads.push(resultThread);
                    console.log("not found");
                }
            });

            this.threads.forEach((existingThread, index) => {
                let foundResultThread = result.find(it => {
                    return it.runningThread == existingThread.runningThread
                });
                if (!foundResultThread) {
                    console.log("delete");
                    delete this.threads[index];
                }
            })
        })
    }

    getScenarioById(scenarioId: number) {
        return this.scenarios.find(it => {return it.id == scenarioId});
    }

    openDetails(runningThread: string) {
        this.openedDetails.push(runningThread);
    }

    watchingDetails(runningThread: string) {
        return this.openedDetails.includes(runningThread);
    }
}
