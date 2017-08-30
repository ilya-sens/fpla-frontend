import {ColumnDefinitionModel} from "./column-definition.model";

export class TableDefinitionModel {
    id: number;
    tableName: string;
    columnDefinitions: Array<ColumnDefinitionModel>;
}
