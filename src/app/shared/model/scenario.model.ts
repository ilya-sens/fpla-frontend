import {ScenarioScriptModel} from "./scenario-script.model";
import {AbstractModel} from "./abstract.model";

export class ScenarioModel extends AbstractModel {
    name: string;
    scenarioScripts: Array<number>;
    sequence: string;
    fileName: string;

    constructor() {
        super();
        this.name = "new scenario";
        this.fileName = "new_scenario.py";
    }
}
