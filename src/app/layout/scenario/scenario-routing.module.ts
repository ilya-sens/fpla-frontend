import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ScenarioComponent} from './scenario.component';

const routes: Routes = [
    {path: '', component: ScenarioComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioRoutingModule {
}
