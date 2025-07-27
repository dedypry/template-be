import { Action } from "routing-controllers";

export class AuthGuard {
  constructor(private readonly opt: string[] = []) {}

  async check(action: Action): Promise<boolean> {
    return true;
  }
}