export interface IUserReview {
  _id: string;
  email: string;
  rating: number;
  comment: string;
}

export interface IReview {
  _id: string;
  users: IUserReview[];
}
