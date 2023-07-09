import api, { API_URL } from "../api/axiosApi";
import { AxiosResponse } from "axios";
import { BookResponse } from "../models/response/BookResponse";
import { IBook } from "../models/IBook";

export default class PostService {
  //create new Book
  static async create(post: IBook): Promise<AxiosResponse<BookResponse>> {
    return api.post<BookResponse, any>("/books/posts", post).then((res) => res);
  }
  //get All books
  static async getAll(): Promise<AxiosResponse<BookResponse[]>> {
    return api.get<BookResponse[]>("/books/posts").then((res) => res);
  }
  //get by id book
  static async getById(id: string): Promise<AxiosResponse<BookResponse>> {
    return api
      .get<BookResponse, any>(`${API_URL}/books/posts/${id}`, { withCredentials: true })
      .then((res) => res);
  }
}
