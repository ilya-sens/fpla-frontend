import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ScenarioComponent} from './scenario.component';
import {ScenarioDetailsComponent} from "./scenario-details.component";

const routes: Routes = [
    {path: '', component: ScenarioComponent},
    {path: ':id', component: ScenarioDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioRoutingModule {
}
