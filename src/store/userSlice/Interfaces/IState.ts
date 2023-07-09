import { IUser } from "../../../models/IUser";

export interface IState {
  user: IUser;
  loading: boolean;
  error: string | null;
}
