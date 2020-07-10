import { Action } from "../Action";
import { IParsable } from "../IParsable";

export class GetAction extends Action implements IParsable {
    public run() {
        throw new Error("Method not implemented.");
    }
    public getPattern(): RegExp {
        throw new Error("Method not implemented.");
    }
    parse(source: String): Action {
        throw new Error("Method not implemented.");
    }

}