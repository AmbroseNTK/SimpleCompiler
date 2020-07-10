import { Num } from "./Num";
import { Str } from "./Str";
export class Value {
  public static parseValue(source: String): Str | Num {
    let strPattern = /\"(.*)\"/;
    let numPattern = /\-{0,1}[0-9]+\.{0,1}[0-9]*/;
    source = source.trim();
    let tokens = source.match(strPattern);
    if (tokens == null) {
      tokens = source.match(numPattern);
      if (tokens == null) {
        throw new Error(source + " is not a valid value");
      }
      return new Num("", parseFloat(tokens[0]));
    }
    return new Str("", tokens[1]);
  }
}
