import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalConfig} from "../../global";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";
import {AlertService} from "../../shared/services/alert.service";
import {ScriptResourceService} from "./script-resource.service";
import {ScriptModel} from "./script.model";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'script-component',
    templateUrl: './script.component.html',
    providers: [ScriptResourceService, NgbModule]
})
export class ScriptComponent implements OnInit {
    @Input() script: ScriptModel;
    @Output() scriptChange: EventEmitter<ScriptModel> = new EventEmitter();

    dateFormat: String = GlobalConfig.DATE_FORMAT;
    typeEnum = TypeEnum;

    constructor(
        private alertService: AlertService,
        private scriptResource: ScriptResourceService,
    ) {}

    ngOnInit() {
    }

    updateScript(script) {
        this.scriptResource.update(script).subscribe();
        console.log("opa...");
        console.log(script);
        this.scriptChange.next(this.script);
    }
}
