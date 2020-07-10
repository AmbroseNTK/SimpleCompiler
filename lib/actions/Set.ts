import { Action } from "../Action";
import { IParsable } from "../IParsable";
import { ActionNotMatchError } from "../ActionNotMatchError";
import { Variable } from "../Variable";
import { Value } from "../Value";

export class SetAction extends Action implements IParsable {
  constructor(public variable: Variable, public value: Variable) {
    super("Set");
  }

  public getPattern(): RegExp {
    return /[\n|\s]*Set[\n|\s]*(.*)[\n|\s]*\=[\n|\s]*(.*)/;
  }

  parse(source: String): Action {
    let tokens = source.match(this.getPattern());
    if (tokens == null) {
      throw new ActionNotMatchError("Set");
    }
    let variable = new Variable("");
    variable = variable.parse(tokens[1]);
    let value = null;
    try {
      value = variable.parse(tokens[2]);
    } catch {
      value = Value.parseValue(tokens[2]);
    }
    return new SetAction(variable, value);
  }

  public run() {}
}
