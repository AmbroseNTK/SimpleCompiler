import { Policy } from "./Policy";

export class GlobalParser {
  public static parse(source: String): Array<Policy> {
    let policies = new Array<Policy>();
    let rawPolicies = source.split(";");
    for (let rawPolicy of rawPolicies) {
      policies.push(Policy.parse(rawPolicy));
    }
    return policies;
  }
}
