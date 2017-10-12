import {AbstractModel} from "./abstract.model";

export class ScheduleModel extends AbstractModel {
    name: string;
    fileName: string;
    sequence: string;
    file: string;

    constructor() {
        super();
        this.name = "new schedule";
        this.fileName = "new_schedule.py";
        this.sequence= "# todo implement";
    }
}
