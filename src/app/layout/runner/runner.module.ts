import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RunnerComponent} from "./runner.component";
import {RunnerDetailsComponent} from "./runner-details.component";
import {RunnerRoutingModule} from "./runner-routing.module";
import {RunnerResourceService} from "../../shared/services/resources/runner-resource.service";
import {ScenarioResourceService} from "../../shared/services/resources/scenario-resource.service";
import {CodemirrorModule} from "ng2-codemirror";
import {FormsModule} from "@angular/forms";
import {ScheduleResourceService} from "../../shared/services/resources/schedule-resource.service";


@NgModule({
    imports: [
        CommonModule,
        RunnerRoutingModule,
        CodemirrorModule,
        FormsModule
    ],
    declarations: [
        RunnerComponent,
        RunnerDetailsComponent
    ],
    providers: [
        RunnerResourceService,
        ScenarioResourceService,
        ScheduleResourceService
    ],
    exports: [
        RunnerComponent
    ]
})
export class RunnerModule {
}
