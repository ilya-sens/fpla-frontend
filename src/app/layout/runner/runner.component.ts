import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ScenarioModel} from "../../shared/model/scenario.model";
import {Observable} from "rxjs/Rx";
import {RunnerResourceService} from "../../shared/services/resources/runner-resource.service";
import {ScenarioResourceService} from "../../shared/services/resources/scenario-resource.service";

import * as _ from "lodash";
import {ThreadModel} from "../../shared/model/thread.model";

@Component({
    selector: 'app-runner',
    templateUrl: './runner.component.html',
    styleUrls: ['./runner.component.scss'],
})
export class RunnerComponent implements OnInit, OnDestroy {
    // @Input() scenario: ScenarioModel;
    scenarios: Array<ScenarioModel>;
    threads: Array<any> = [];

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
            result.forEach(currentResult => {
                if (currentResult in (this.threads as Array<any>)) {
                    return;
                } else {
                    let threadFound = _.find(this.threads, {'runningThread': currentResult.runningThread});
                    if (threadFound) {
                        threadFound = currentResult;
                    } else {
                        this.threads.push(currentResult)
                    }
                }
            });

            this.threads.forEach((currentThread, index) => {
                if ((currentThread as any) !in result) {
                    delete this.threads[index];
                    if (this.watchingDetails(currentThread.runningThread))
                        _.remove(this.openedDetails, currentThread.runningThread)
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
