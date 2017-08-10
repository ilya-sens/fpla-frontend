import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScenarioRoutingModule} from './scenario-routing.module';
import {ScenarioComponent} from './scenario.component';
import {PageHeaderModule} from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        ScenarioRoutingModule,
        PageHeaderModule
    ],
    declarations: [ScenarioComponent]
})
export class ScenarioModule {
}
