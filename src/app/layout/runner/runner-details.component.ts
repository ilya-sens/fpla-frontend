import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {ScenarioModel} from "../../shared/model/scenario.model";
import {ThreadModel} from "../../shared/model/thread.model";
import {CodemirrorComponent} from "ng2-codemirror";

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
    @Input() thread: ThreadModel;
    @ViewChild(CodemirrorComponent) private codemirrorComponent: CodemirrorComponent;
    cm: any;

    private highlightedLineNumber = -1;

    ngDoCheck() {
        if (!this.cm)
            this.cm = this.codemirrorComponent.instance;
        if (this.cm) {
            this.onRefresh();
        }
    }

    ngOnInit(): void {
        console.log("on init called");
        this.onRefresh();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log("on changes called");
        if (!_.isEqual(changes.thread.currentValue, this.thread)) {
            this.onRefresh();
        }
    }

    onRefresh() {
        if (this.highlightedLineNumber) {
            this.cm.doc.removeLineClass(this.highlightedLineNumber, "background", "active-line-background");
        }
        this.highlightedLineNumber = +this.thread.line.split(' ')[1] - 1;
        this.cm.doc.addLineClass(this.highlightedLineNumber, "background", "active-line-background");
    }

    constructor() {
    }
}
