import {Component, OnInit} from "@angular/core";
import {TableDefinitionModel} from "../../shared/model/table-definition.model";
import {GenTablesResourceService} from "../../shared/services/resources/gen-tables-resource.service";

@Component({
    selector: 'app-gen-tables',
    templateUrl: './gen-tables.component.html',
    styleUrls: ['./gen-tables.component.scss'],
    providers: [GenTablesResourceService]
})
export class GenTablesComponent implements OnInit {
    tableDefinitions: Array<TableDefinitionModel>;

    constructor(private genTablesResource: GenTablesResourceService,) {
    }

    ngOnInit(): void {
        this.loadData()
    }

    loadData() {
        this.genTablesResource.get().subscribe(result => {
            this.tableDefinitions = result;
        });
    }

}
