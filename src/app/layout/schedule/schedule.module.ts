import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScheduleRoutingModule} from './schedule-routing.module';
import {ScheduleComponent} from './schedule.component';
import {PageHeaderModule} from './../../shared';
import {Ng2OrderModule} from "ng2-order-pipe";
import {EditableElementModule} from "../../shared/modules/editable-element/editable-element.module";
import {NgbDropdown, NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        PageHeaderModule,
        Ng2OrderModule,
        EditableElementModule,
        NgbModule,
    ],
    declarations: [
        ScheduleComponent,
    ],
    providers: [
        NgbDropdown
    ]
})
export class ScheduleModule {
}
