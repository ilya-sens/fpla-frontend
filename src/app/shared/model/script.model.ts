import {AbstractModel} from "./abstract.model";

export class ScriptModel extends AbstractModel {
    name: string;
    sequence: string;

    constructor() {
        super();
        this.name = "new script";
        this.sequence= "// todo implement";
    }
}
