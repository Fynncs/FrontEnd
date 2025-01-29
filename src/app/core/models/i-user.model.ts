import { ModelState, IPerson } from "@fynnc.models";

export interface IUser extends ModelState<IUser> {
  id?: string;
  login?: string[];
  oauthProvider?: string;
  password?: string;
  person?: IPerson;
}
