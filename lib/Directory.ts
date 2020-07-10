import { Variable } from "./Variable";

export class Directory extends Variable {
  constructor(public dir: String) {
    super(dir);
  }
}
