import {Component, Input, OnInit} from "@angular/core";
import {TableDefinitionModel} from "../../shared/model/table-definition.model";
import {GenTablesCrudResourceService} from "../../shared/services/resources/gen-tables-crud-resource.service";

@Component({
    selector: 'app-gen-tables-crud',
    templateUrl: './gen-tables-crud.component.html',
    providers: [GenTablesCrudResourceService]
})
export class GenTablesCrudComponent implements OnInit {
    @Input() tableDefinition: TableDefinitionModel;

    rows: Array<any>;
    rowsToCreate: Array<any> = [];

    isDeletingEnabled: boolean = false;

    constructor(
        private crudResource: GenTablesCrudResourceService
    ) {

    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.crudResource.get(this.tableDefinition.id).subscribe(result => {
            this.rows = result;
        });
    }

    deleteRow(row) {
        this.crudResource.remove(this.tableDefinition.id, row.ID).subscribe(ignore => {
            this.loadData();
        })
    }

    addRow() {
        this.rowsToCreate.push(this.generateRow())
    }

    private generateRow(): any {
        let rowToGenerate: object = {};
        this.tableDefinition.columnDefinitions.forEach(it => {
            rowToGenerate[it.name] = null;
        });
        return rowToGenerate;
    }

    updateValue(row: any, columnName: string) {
        let fakeRow: object = {};
        fakeRow["ID"] = row.ID;
        fakeRow[columnName] = row[columnName];
        this.crudResource.update(this.tableDefinition.id, fakeRow).subscribe(result => {
            this.rows = result;
        });
    }

    createRow(rowToCreate: any) {
        this.crudResource.create(this.tableDefinition.id, rowToCreate).subscribe(result => {
            this.rows = result;
            this.deleteRowToCreate(rowToCreate);
        })
    }

    deleteRowToCreate(rowToCreate: any) {
        let index: number = this.rowsToCreate.indexOf(rowToCreate);
        if (index > -1) {
            this.rowsToCreate.splice(index, 1);
        }
    }

    deleteAllRowsToCreate() {
        this.rowsToCreate = [];
    }

    createAllRowsToCreate() {
        this.rowsToCreate.forEach(rowToCreate => {
            this.createRow(rowToCreate);
        });
    }

    handleRowsGenerated(generatedRows: Array<any>) {
        // todo here must be checked if genereated rows' keys are same with columns of tableDefinition
        generatedRows.forEach(row => {
            this.rowsToCreate.push(row);
        });
    }
}
