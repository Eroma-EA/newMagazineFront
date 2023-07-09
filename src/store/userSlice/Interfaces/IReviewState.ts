import { IReview } from "../../../models/IReview";

export interface IReviewState {
  review: IReview;
  loading: boolean;
  error: string | null;
}
