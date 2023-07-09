import api from "../api/axiosApi";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  //login
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api
      .post<AuthResponse, any>("/user/login", { email, password })
      .then((res) => res);
  }
  //registration
  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api
      .post<AuthResponse, any>("/user/registration", { email, password })
      .then((res) => res);
  }

  //logout
  static async logout(): Promise<void> {
    return api.post("/user/logout");
  }
}
