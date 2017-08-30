export enum ColumnType {
    bool,
    text,
    number,
    date
}

export class ColumnDefinitionModel {
    id: number;
    name: string;
    type: ColumnType
}
