import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenTablesDetailsComponent} from "./gen-tables-details.component";
import {GenTablesComponent} from "./gen-tables.component";


const routes: Routes = [
    {path: '', component: GenTablesComponent},
    {path: ':id', component: GenTablesDetailsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GenTablesRoutingModule {
}
