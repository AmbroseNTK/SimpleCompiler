import { Variable } from "./Variable";

export class Num extends Variable {
  constructor(name: String, public data: number) {
    super(name);
  }
}
