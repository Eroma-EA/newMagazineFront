import { IBook } from "../../../models/IBook";

export interface IPostsState {
  books: IBook[];

  loading: boolean;
  error: string | null;
}
