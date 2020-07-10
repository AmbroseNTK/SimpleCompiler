import { ConditionOperators } from "./ConditionOperators";
import { Variable } from "./Variable";
import { IParsable } from "./IParsable";
import { Directory } from "./Directory";

export class Condition implements IParsable {
  constructor(
    public operator: ConditionOperators,
    public left: Variable,
    public right: Variable
  ) {}
  parse(source: String): Condition {
    let pattern = /[\s|\n]*([a-zA-Z0-9.$]*)[\s|\n]*([a-zA-Z\-]*)[\s|\n]*(.*)/;
    let tokens = source.match(pattern);
    let left = new Variable("");
    try {
      left = left.parse(tokens[1]);
    } catch {
      left = new Directory(tokens[1]);
    }

    let right = new Variable("");
    right = right.parse(tokens[3]);
    let operator = ConditionOperators.CONTAINS;
    switch (tokens[2].trim().toLowerCase()) {
      case "contains":
        operator = ConditionOperators.CONTAINS;
        break;
      case "equals":
        operator = ConditionOperators.EQUALS;
        break;
      case "not-equals":
        operator = ConditionOperators.NOT_EQUALS;
        break;
      case "greater-than":
        operator = ConditionOperators.GREATER_THAN;
        break;
      case "greater-than-or-equal":
        operator = ConditionOperators.GREATER_THAN_OR_EQUAL;
        break;
      case "less-than":
        operator = ConditionOperators.LESS_THAN;
        break;
      case "less-than-or-equal":
        operator = ConditionOperators.LESS_THAN_OR_EQUAL;
        break;
      default:
        throw new Error(tokens[2] + " is not a valid operator");
    }
    return new Condition(operator, left, right);
  }
  run(): boolean {
    return false;
  }
}
