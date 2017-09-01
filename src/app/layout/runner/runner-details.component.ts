import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {ScenarioModel} from "../../shared/model/scenario.model";
import {ThreadModel} from "../../shared/model/thread.model";
import {CodemirrorComponent} from "ng2-codemirror";
import {ScheduleModel} from "../../shared/model/schedule.model";

import 'codemirror'
import 'codemirror/mode/python/python'
import * as _ from "lodash";

@Component({
    selector: 'app-details-runner',
    templateUrl: './runner-details.component.html',
    styleUrls: ['./runner.component.scss'],
})
export class RunnerDetailsComponent implements OnInit, OnChanges, DoCheck {
    @Input() scenario: ScenarioModel;
    @Input() schedule: ScheduleModel;
    @Input() thread: ThreadModel;
    @ViewChild(CodemirrorComponent) private codemirrorComponent: CodemirrorComponent;
    cm: any;

    private highlightedLineNumber = -1;

    ngDoCheck() {
        if (!this.cm && this.codemirrorComponent)
            this.cm = this.codemirrorComponent.instance;
        if (this.cm) {
            this.onRefresh();
        }
    }

    ngOnInit(): void {
        this.onRefresh();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!_.isEqual(changes.thread.currentValue, this.thread)) {
            this.onRefresh();
        }
    }

    onRefresh() {
        if (this.cm) {
            if (this.highlightedLineNumber) {
                this.cm.doc.removeLineClass(this.highlightedLineNumber, "background", "active-line-background");
            }
            if (this.scenario) {
                this.highlightedLineNumber = +this.thread.scenarioLine.split(' ')[1] - 1;
            }
            if (this.schedule) {
                this.highlightedLineNumber = +this.thread.scheduleLine.split(' ')[1] - 1;
            }
            this.cm.doc.addLineClass(this.highlightedLineNumber, "background", "active-line-background");
        }
    }

    constructor() {
    }
}
