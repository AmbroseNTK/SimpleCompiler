import { IParsable } from "./IParsable";

export class Parser {
  private parsers: Array<IParsable>;

  constructor() {
    this.parsers = new Array();
  }
}
