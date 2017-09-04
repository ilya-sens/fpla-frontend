import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenTablesComponent} from "./gen-tables.component";
import {GenTablesDetailsComponent} from "./gen-tables-details.component";
import {GenTablesRoutingModule} from "./gen-tables-routing.module";
import {CodemirrorModule} from "ng2-codemirror";
import {FormsModule} from "@angular/forms";
import {EditableElementModule} from "../../shared/modules/editable-element/editable-element.module";
import {GenTablesCrudComponent} from "./gen-tables-crud.component";
import {Ng2OrderModule} from "ng2-order-pipe";
import {GenTablesCrudBulkAddingComponent} from "./gen-tables-crud-bulk-adding.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    imports: [
        CommonModule,
        GenTablesRoutingModule,
        CodemirrorModule,
        FormsModule,
        EditableElementModule,
        Ng2OrderModule,
        NgbModule.forRoot()
    ],
    declarations: [
        GenTablesComponent,
        GenTablesDetailsComponent,
        GenTablesCrudComponent,
        GenTablesCrudBulkAddingComponent,
    ],
    providers: [],
    exports: [
        GenTablesComponent
    ]
})
export class GenTablesModule {
}
