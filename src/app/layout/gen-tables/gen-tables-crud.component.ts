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

    generateArray(obj){
        return Object.keys(obj).map((key)=>{ return obj[key]});
    }
}
