import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ScenarioModel} from "../../shared/model/scenario.model";
import {Observable} from "rxjs/Rx";
import {RunnerResourceService} from "../../shared/services/resources/runner-resource.service";
import {ScenarioResourceService} from "../../shared/services/resources/scenario-resource.service";

import {ThreadModel} from "../../shared/model/thread.model";
import {ScheduleModel} from "../../shared/model/schedule.model";
import {ScheduleResourceService} from "../../shared/services/resources/schedule-resource.service";

export enum RunnerListTypesEnum {
    onlyScenario,
    onlySchedule,
    defaultType,
}

@Component({
    selector: 'app-runner',
    templateUrl: './runner.component.html',
    styleUrls: ['./runner.component.scss'],
})
export class RunnerComponent implements OnInit, OnDestroy {
    @Input() scenario: ScenarioModel;
    @Input() schedule: ScheduleModel;
    @Input() runnerListType: RunnerListTypesEnum = RunnerListTypesEnum.defaultType;
    scenarios: Array<ScenarioModel>;
    schedules: Array<ScheduleModel>;
    threads: Array<ThreadModel> = [];

    openedDetails: Array<string> = [];
    sub: any;

    runnerListTypesEnum = RunnerListTypesEnum;

    constructor(private runnerResource: RunnerResourceService,
                private scenarioResource: ScenarioResourceService,
                private scheduleResource: ScheduleResourceService,
                ) {
    }

    ngOnInit(): void {
        if (this.runnerListType == RunnerListTypesEnum.defaultType) {
            this.scenarioResource.get().subscribe(result => this.scenarios = result.data);
            this.scheduleResource.get().subscribe(result => this.schedules = result.data);
        }
        this.sub = Observable.timer(0, 3000).map(() => this.getRunnerStatus()).subscribe();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getRunnerStatus() {
        this.runnerResource.getStatus().subscribe(result => {
            result.forEach(resultThread => {
                let found = this.threads.find(it => {
                    return it.runningThread == resultThread.runningThread
                });
                if (found) {
                    if (found.scenarioLine != resultThread.scenarioLine) found.scenarioLine = resultThread.scenarioLine;
                    if (found.scenarioExceptions != resultThread.scenarioExceptions) found.scenarioExceptions = resultThread.scenarioExceptions;
                } else {
                    this.threads.push(resultThread);
                }
            });

            this.threads.forEach((existingThread, index) => {
                let foundResultThread = result.find(it => {
                    return it.runningThread == existingThread.runningThread
                });
                if (!foundResultThread) {
                    delete this.threads[index];
                }
            })
        })
    }

    stopThread(thread: ThreadModel) {
        this.runnerResource.stop(thread.runningThread).subscribe(ignore => {
            this.getRunnerStatus();
        });
    }

    getScenarioById(scenarioId: number) {
        return this.scenarios.find(it => {return it.id == scenarioId});
    }

    getScheduleById(schduleId: number) {
        return this.schedules.find(it => {return it.id == schduleId})
    }

    getThreads() {
        switch (this.runnerListType) {
            case RunnerListTypesEnum.onlyScenario:
                return this.threads.filter(thread => {
                    return thread.scenarioId == this.scenario.id
                });
            case RunnerListTypesEnum.onlySchedule:
                return this.threads.filter(thread => {
                    return thread.scheduleId == this.schedule.id
                });
            case RunnerListTypesEnum.defaultType:
                return this.threads
        }
    }

    openDetails(runningThread: string) {
        this.openedDetails.push(runningThread);
    }

    watchingDetails(runningThread: string) {
        return this.openedDetails.includes(runningThread);
    }
}
