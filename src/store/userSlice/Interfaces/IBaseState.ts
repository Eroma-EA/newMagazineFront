import { IBase } from "../../../models/IBase";

export interface IBaseState {
  user: IBase;
  loading: boolean;
  error: string | null;
}

