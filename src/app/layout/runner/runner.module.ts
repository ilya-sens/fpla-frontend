import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RunnerComponent} from "./runner.component";
import {RunnerDetailsComponent} from "./runner-details.component";
import {RunnerRoutingModule} from "./runner-routing.module";
import {RunnerResourceService} from "../../shared/services/resources/runner-resource.service";
import {ScenarioResourceService} from "../../shared/services/resources/scenario-resource.service";


@NgModule({
    imports: [
        CommonModule,
        RunnerRoutingModule
    ],
    declarations: [
        RunnerComponent,
        RunnerDetailsComponent
    ],
    providers: [
        RunnerResourceService,
        ScenarioResourceService
    ]
})
export class RunnerModule {
}