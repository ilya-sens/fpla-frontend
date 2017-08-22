import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalConfig} from "../../global";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";
import {AlertService} from "../../shared/services/alert.service";
import {ScriptResourceService} from "./script-resource.service";

@Component({
    selector: 'script-component',
    templateUrl: './script.component.html',
    providers: [ScriptResourceService]
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
        this.scriptChange.next(this.script);
    }
}
