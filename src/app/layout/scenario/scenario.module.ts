import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScenarioRoutingModule} from './scenario-routing.module';
import {ScenarioComponent} from './scenario.component';
import {PageHeaderModule} from './../../shared';
import {Ng2OrderModule} from "ng2-order-pipe";
import {EditableElementModule} from "../../shared/modules/editable-element/editable-element.module";
import {Ng2DragDropModule} from "ng2-drag-drop";
import {ScriptComponent} from "./script.component";
import {NgbDropdown, NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        ScenarioRoutingModule,
        PageHeaderModule,
        Ng2OrderModule,
        Ng2DragDropModule,
        EditableElementModule,
        NgbModule,
    ],
    declarations: [
        ScenarioComponent,
        ScriptComponent,
    ],
    providers: [
        NgbDropdown
    ]
})
export class ScenarioModule {
}
