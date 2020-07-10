export class ActionNotMatchError extends Error {
  constructor(public action: string) {
    super(action + " not match");
  }
}
