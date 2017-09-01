import {Component, Input, OnInit, Output} from "@angular/core";
import {TableDefinitionModel} from "../../shared/model/table-definition.model";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";
import {GenTablesResourceService} from "../../shared/services/resources/gen-tables-resource.service";
import {ColumnDefinitionModel} from "../../shared/model/column-definition.model";

@Component({
    selector: 'app-gen-tables-details',
    templateUrl: './gen-tables-details.component.html',
    styleUrls: ['./gen-tables.component.scss'],
})
export class GenTablesDetailsComponent implements OnInit {
    @Input() tableDefinition: TableDefinitionModel;
    @Input() save: boolean = true;
    columnDefinitionsToAdd: Array<ColumnDefinitionModel> = [];

    editableType = TypeEnum;

    constructor(private genTableResource: GenTablesResourceService) {

    }

    ngOnInit(): void {
    }

    updateTableDefinition() {
        this.genTableResource.update(this.tableDefinition).subscribe(ignore => {
            this.genTableResource.get(this.tableDefinition.id).subscribe(updatedTableDefinition => {
                console.log(updatedTableDefinition);
                this.tableDefinition = updatedTableDefinition;
            });
        });
    }

    deleteColumnDefinition(columnDefinition: ColumnDefinitionModel) {
        let index: number = this.tableDefinition.columnDefinitions.indexOf(columnDefinition);
        if (index > -1) {
            this.tableDefinition.columnDefinitions.splice(index, 1);
            if (this.save) {
                this.updateTableDefinition();
            }
        }
    }

    addColumnDefinition() {
        this.columnDefinitionsToAdd.push(new ColumnDefinitionModel())
    }

    createColumnDefinition(columnDefinition: ColumnDefinitionModel) {
        this.tableDefinition.columnDefinitions.push(columnDefinition);
        let index: number = this.columnDefinitionsToAdd.indexOf(columnDefinition);
        if (index > -1) {
            this.columnDefinitionsToAdd.splice(index, 1);
        }
        if (this.save) this.updateTableDefinition();
    }

    createColumnDefinitions() {
        this.columnDefinitionsToAdd.forEach(columnDefinitionToAdd => {
            this.tableDefinition.columnDefinitions.push(columnDefinitionToAdd)
        });
        if (this.save) this.updateTableDefinition();
        this.columnDefinitionsToAdd = [];
    }

    deleteColumnDefinitionToAdd(columnDefinition: ColumnDefinitionModel) {
        let index: number = this.columnDefinitionsToAdd.indexOf(columnDefinition);
        if (index > -1) {
            this.columnDefinitionsToAdd.splice(index, 1);
        }
    }
}
