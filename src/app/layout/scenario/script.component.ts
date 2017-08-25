import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalConfig} from "../../global";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";
import {AlertService} from "../../shared/services/alert.service";
import {ScriptResourceService} from "../../shared/services/resources/script-resource.service";
import {ScriptModel} from "../../shared/model/script.model";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'script-component',
    templateUrl: './script.component.html',
    providers: [ScriptResourceService, NgbModule]
})
export class ScriptComponent implements OnInit {
    @Input() script: ScriptModel;
    @Input() deletable: Boolean;
    @Input() removable: Boolean;
    @Output() scriptChange: EventEmitter<ScriptModel> = new EventEmitter();
    @Output() scriptRemove: EventEmitter<Boolean> = new EventEmitter();
    @Output() scriptDelete: EventEmitter<Boolean> = new EventEmitter();

    dateFormat: String = GlobalConfig.DATE_FORMAT;
    typeEnum = TypeEnum;

    constructor(
        private alertService: AlertService,
        private scriptResource: ScriptResourceService,
    ) {}

    ngOnInit() {
    }

    updateScript() {
        this.scriptResource.update(this.script).subscribe();
        this.scriptChange.next(this.script);
    }

    delete() {
        this.scriptDelete.next(true);
    }

    remove() {
        this.scriptRemove.next(true);
    }
}
