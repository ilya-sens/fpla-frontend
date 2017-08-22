import {ScenarioScriptModel} from "./scenario-script.model";
import {AbstractModel} from "../../shared/model/abstract.model";

export class ScenarioModel extends AbstractModel {
    name: string;
    scenarioScripts: Array<number>;

    constructor() {
        super();
        this.name = "new scenario"
    }
}
