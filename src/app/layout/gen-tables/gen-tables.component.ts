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
    private openedCruds: Array<number> = [];
    private openedDetails: Array<number> = [];

    isDeletingEnabled = false;
    editableType = TypeEnum;

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
        return this.openedDetails.indexOf(tableDefinition.id) > -1;
    }

    switchOpenDetails(tableDefinition: TableDefinitionModel) {
        let openedDetailsIndex: number = this.openedDetails.indexOf(tableDefinition.id);
        if (openedDetailsIndex > -1)
            this.openedDetails.splice(openedDetailsIndex, 1);
        else
            this.openedDetails.push(tableDefinition.id);
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

    switchOpenCrud(tableDefinition: TableDefinitionModel) {
        let openedCrudIndex: number = this.openedCruds.indexOf(tableDefinition.id);
        if (openedCrudIndex > -1)
            this.openedCruds.splice(openedCrudIndex, 1);
        else
            this.openedCruds.push(tableDefinition.id);
    }

    watchingCrud(tableDefinition: TableDefinitionModel) {
        return this.openedCruds.indexOf(tableDefinition.id) > -1;
    }
}
