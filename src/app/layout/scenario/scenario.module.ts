import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScenarioRoutingModule} from './scenario-routing.module';
import {ScenarioComponent} from './scenario.component';
import {PageHeaderModule} from './../../shared';
import {Ng2OrderModule} from "ng2-order-pipe";
import {EditableElementComponent} from "../../shared/modules/editable-element/editable-element.component";
import {EditableElementModule} from "../../shared/modules/editable-element/editable-element.module";

@NgModule({
    imports: [
        CommonModule,
        ScenarioRoutingModule,
        PageHeaderModule,
        Ng2OrderModule,
        EditableElementModule
    ],
    declarations: [
        ScenarioComponent,
    ],
})
export class ScenarioModule {
}
