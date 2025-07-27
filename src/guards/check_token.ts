import { Action, UnauthorizedError } from "routing-controllers";

export async function checkToken(action: Action, roles: string[]) {
  const token = action.request.headers["authorization"];

  const user = {
    name: "dedy",
  };

  action.request.user = user

  return true
}
