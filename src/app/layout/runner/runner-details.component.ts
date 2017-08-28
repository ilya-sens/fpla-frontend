import {Component, Input, OnInit} from "@angular/core";
import {ScenarioModel} from "../../shared/model/scenario.model";
import {ThreadModel} from "../../shared/model/thread.model";

@Component({
    selector: 'app-details-runner',
    templateUrl: './runner-details.component.html',
})
export class RunnerDetailsComponent implements OnInit {
    @Input() scenario: ScenarioModel;
    @Input() thread: ThreadModel;

    ngOnInit(): void {
    }

    constructor() {
    }
}
