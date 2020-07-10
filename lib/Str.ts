import { Variable } from "./Variable";
import { IParsable } from "./IParsable";

export class Str extends Variable implements IParsable {
  constructor(public name: String, public data: String) {
    super(name);
    this.data = data;
  }
  public parse(source: String): Str {
    return new Str("", "");
  }
}
