export abstract class Action {
  constructor(public verb: String) {}

  public abstract run();
  public abstract getPattern(): RegExp;
}
