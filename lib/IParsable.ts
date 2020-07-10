import { Action } from "./Action";
import { Variable } from "./Variable";
import { Condition } from "./Condition";

export interface IParsable {
  parse(source: String): Action | Variable | Condition;
}
