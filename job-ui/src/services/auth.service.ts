import { apiClient } from "@/lib/axios";

export interface LoginPayload {
  username: string;
  password: string;
}

export const authService = {
  login: async (data: LoginPayload) => {
    const response = await apiClient.post("/login", data);
    return response.data;
  },
};
