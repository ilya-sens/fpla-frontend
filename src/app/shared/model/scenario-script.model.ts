import {ScenarioModel} from "./scenario.model";
import {ScriptModel} from "./script.model";
import {AbstractModel} from "./abstract.model";

export class ScenarioScriptModel extends AbstractModel {
    index: number;
    scenario: number;
    script: number;

    constructor(scenario: number, script: number) {
        super();
        this.scenario = scenario;
        this.script = script;
    }
}
