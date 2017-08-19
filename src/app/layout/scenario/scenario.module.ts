import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScenarioRoutingModule} from './scenario-routing.module';
import {ScenarioComponent} from './scenario.component';
import {PageHeaderModule} from './../../shared';
import {Ng2OrderModule} from "ng2-order-pipe";

@NgModule({
    imports: [
        CommonModule,
        ScenarioRoutingModule,
        PageHeaderModule,
        Ng2OrderModule
    ],
    declarations: [
        ScenarioComponent,
    ],
})
export class ScenarioModule {
}
