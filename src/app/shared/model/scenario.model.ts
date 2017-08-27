import {ScenarioScriptModel} from "./scenario-script.model";
import {AbstractModel} from "./abstract.model";

export class ScenarioModel extends AbstractModel {
    name: string;
    sequence: string;
    fileName: string;
    runningThreads: Array<any>;
    _errorMessage: string;

    constructor() {
        super();
        this.name = "new scenario";
        this.fileName = "new_scenario.py";
    }
}
