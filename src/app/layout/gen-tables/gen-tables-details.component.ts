import {Component, Input, OnInit} from "@angular/core";
import {TableDefinitionModel} from "../../shared/model/table-definition.model";

@Component({
    selector: 'app-gen-tables-details',
    templateUrl: './gen-tables-details.component.html',
    styleUrls: ['./gen-tables.component.scss'],
})
export class GenTablesDetailsComponent implements OnInit {
    @Input() tableDefinition: TableDefinitionModel;

    constructor() {

    }

    ngOnInit(): void {
    }

}
