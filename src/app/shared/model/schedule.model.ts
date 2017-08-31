import {AbstractModel} from "./abstract.model";

export class ScheduleModel extends AbstractModel {
    name: string;
    fileName: string;
    sequence: string;

    constructor() {
        super();
        this.name = "new schedule";
        this.sequence= "# todo implement";
    }
}
