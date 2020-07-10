import { IParsable } from "./IParsable";
import { Action } from "./Action";

export class Variable implements IParsable {
  constructor(public name: String) {}
  public parse(source: String): Variable {
    let tokens = source.match(/\$([a-zA-Z0-9]*)/);
    if (tokens == null) {
      // return new Directory(tokens[1]);
      throw new Error(source + " is not a valid variable name");
    }
    if (tokens[1] == "") {
      throw new Error("Variable name should not be null");
    }
    return new Variable(tokens[1]);
  }
}
