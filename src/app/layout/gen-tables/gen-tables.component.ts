import {Component, OnInit} from "@angular/core";
import {TableDefinitionModel} from "../../shared/model/table-definition.model";
import {GenTablesResourceService} from "../../shared/services/resources/gen-tables-resource.service";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";

@Component({
    selector: 'app-gen-tables',
    templateUrl: './gen-tables.component.html',
    styleUrls: ['./gen-tables.component.scss'],
    providers: [GenTablesResourceService]
})
export class GenTablesComponent implements OnInit {
    tableDefinitions: Array<TableDefinitionModel>;
    tableDefinitionsToCreate: Array<TableDefinitionModel> = [];

    editableType = TypeEnum;

    private openedTableDefinitionDetails: Array<number> = [];

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

    watchingDetails(tableDefinition: TableDefinitionModel): boolean {
        return this.openedTableDefinitionDetails.includes(tableDefinition.id);
    }

    openDetails(tableDefinition: TableDefinitionModel) {
        this.openedTableDefinitionDetails.push(tableDefinition.id);
    }

    updateTableDefinition(tableDefinition: TableDefinitionModel) {
        this.genTablesResource.update(tableDefinition).subscribe(ignore => {
            this.genTablesResource.get(tableDefinition.id).subscribe(resultTableDefinition => {
                tableDefinition = resultTableDefinition;
            })
        })
    }

    deleteTableDefinition(tableDefinition: TableDefinitionModel) {
        this.genTablesResource.remove(tableDefinition.id).subscribe(ignore => {
            this.loadData();
        })
    }

    addTableDefinition() {
        let tableDefinitionToCreate: TableDefinitionModel = new TableDefinitionModel();
        tableDefinitionToCreate.columnDefinitions = [];
        this.tableDefinitionsToCreate.push(tableDefinitionToCreate);
    }

    createTableDefinitions() {
        this.tableDefinitionsToCreate.forEach(tableDefinitionToCreate => {
            this.genTablesResource.create(tableDefinitionToCreate).subscribe();
        });
        this.tableDefinitionsToCreate = [];
        this.loadData();
    }

    createTableDefinition(tableDefinitionToCreate: TableDefinitionModel) {
        this.genTablesResource.create(tableDefinitionToCreate).subscribe(ignore => {
            this.deleteTableDefinitionToCreate(tableDefinitionToCreate);
            this.loadData();
        });
    }

    deleteAllTableDefinitionsToCreate() {
        this.tableDefinitionsToCreate = [];
    }

    deleteTableDefinitionToCreate(tableDefinitionToCreate: TableDefinitionModel) {
        let index: number = this.tableDefinitionsToCreate.indexOf(tableDefinitionToCreate);
        if (index > -1) {
            this.tableDefinitionsToCreate.splice(index, 1);
        }
    }
}
