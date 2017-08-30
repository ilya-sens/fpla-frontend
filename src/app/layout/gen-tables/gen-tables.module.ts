import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenTablesComponent} from "./gen-tables.component";
import {GenTablesDetailsComponent} from "./gen-tables-details.component";
import {GenTablesRoutingModule} from "./gen-tables-routing.module";
import {CodemirrorModule} from "ng2-codemirror";
import {FormsModule} from "@angular/forms";
import {EditableElementModule} from "../../shared/modules/editable-element/editable-element.module";
import {GenTablesCrudComponent} from "./gen-tables-crud.component";


@NgModule({
    imports: [
        CommonModule,
        GenTablesRoutingModule,
        CodemirrorModule,
        FormsModule,
        EditableElementModule
    ],
    declarations: [
        GenTablesComponent,
        GenTablesDetailsComponent,
        GenTablesCrudComponent
    ],
    providers: [
    ],
    exports: [
        GenTablesComponent
    ]
})
export class GenTablesModule {
}
