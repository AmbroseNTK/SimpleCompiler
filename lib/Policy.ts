import { Stage } from "./Stage";
import { Action } from "./Action";
import { Condition } from "./Condition";
import { IParsable } from "./IParsable";
import { SetAction } from "./actions/Set";

export class Policy {
  constructor(
    public stage: Stage,
    public actions: Array<Action>,
    public resource: String,
    public condition: Condition | null
  ) {}

  private static fullClause = /[\n|\s]*ON[\n|\s]*(.+)[\n|\s]*RUN[\n|\s]*(.+)[\n|\s]*WHERE[\n|\s]*(.+\n*)[\n|\s]*CONDITION[\n|\s]*(.+\n*)/;
  private static halfClause = /[\n|\s]*ON[\n|\s]*(.+)[\n|\s]*RUN[\n|\s]*(.+)[\n|\s]*WHERE[\n|\s]*(.+\n*)/;

  public static actionParsers: IParsable[] = [new SetAction(null, null)];

  public static parse(source: String): Policy {
    let parsed = source.match(this.fullClause);
    if (parsed == null) {
      parsed = source.match(this.halfClause);
      if (parsed == null) {
        throw new Error("Policy is malformed");
      }
    }
    let stage = Stage.PRE_VALIDATE;
    if (parsed[1].trim() == "pre-validate") {
      stage = Stage.PRE_VALIDATE;
    } else if (parsed[1].trim() == "post-validate") {
      stage = Stage.POST_VALIDATE;
    } else {
      throw new Error("STAGE should be pre-validate or post-validate");
    }
    let rawActions = parsed[2].trim().split("\n");
    let actions = new Array<Action>();
    for (let rawAction of rawActions) {
      if (rawAction == "") {
        continue;
      }
      for (let parser of this.actionParsers) {
        try {
          let action = parser.parse(rawAction.trim());
          if (action instanceof Action) {
            actions.push(action);
          }
        } catch (e) {
          if (e instanceof Error) {
            throw e;
          } else {
            continue;
          }
        }
      }
    }
    if (parsed[4] == undefined) {
      return new Policy(stage, actions, parsed[3].trim(), null);
    }
    let condition = new Condition(null, null, null);
    condition = condition.parse(parsed[4].trim());
    return new Policy(stage, actions, parsed[3].trim(), condition);
  }
}
