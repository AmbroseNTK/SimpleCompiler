import { expect } from "chai";
import "mocha";
import { GlobalParser } from "../GlobalParser";
import { Action } from "../Action";
import { SetAction } from "../actions/Set";
import { Num } from "../Num";
import { Directory } from "../Directory";
import { Variable } from "../Variable";
import { ConditionOperators } from "../ConditionOperators";

describe("Test Parser", () => {
  it("full clauses", () => {
    let source =
      "ON pre-validate RUN Set $abc = 0 WHERE codeathon.get CONDITION user.id Equals $xyz";
    let policies = GlobalParser.parse(source);
    expect(policies.length).to.equal(1);
  });

  it("half clause", () => {
    let source = "ON pre-validate RUN Set $abc = 0 WHERE codeathon.get";
    let policies = GlobalParser.parse(source);
    expect(policies.length).to.equal(1);
  });
});

describe("Test Set Action", () => {
  it("Must be correct form", () => {
    let source =
      "ON pre-validate RUN Set $abc = 0\nSet $xyz = $abc WHERE codeathon.get CONDITION user.id Equals $xyz";
    let policies = GlobalParser.parse(source);
    expect(policies[0].actions.length).to.equal(2);
    if (policies[0].actions[0] instanceof SetAction) {
      expect(policies[0].actions[0].verb).to.equal("Set");
      let setAction1: SetAction = <SetAction>policies[0].actions[0];
      expect(setAction1.variable.name).to.equal("abc");
      expect((<Num>setAction1.value).data).to.equal(0);
    } else {
      expect(true).to.equal(false);
    }
    expect(policies[0].resource).to.equal("codeathon.get");
    expect((<Directory>policies[0].condition.left).dir).to.equal("user.id");
    expect((<Variable>policies[0].condition.right).name).to.equal("xyz");
    expect(policies[0].condition.operator).to.equal(ConditionOperators.EQUALS);
    if (policies[0].actions[1] instanceof SetAction) {
      let setAction2 = <SetAction>policies[0].actions[1];
      expect((<Variable>setAction2.value).name).to.equal("abc");
    }
  });
});
