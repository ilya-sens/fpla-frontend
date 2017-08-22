import {AbstractModel} from "../../shared/model/abstract.model";

export class ScriptModel extends AbstractModel {
    name: string;
    sequence: string;

    constructor() {
        super();
        this.name = "new scenario";
        this.sequence= "// todo implement";
    }
}
