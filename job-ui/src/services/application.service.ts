import axios from "axios";
import { Vacancy } from "./vacancy.service";

const API_URL = "http://localhost:8000/api";

export interface Application {
  id: number;
  user_id: number;
  vacancy_id: number;
  status: string;
  created_at: string;
  vacancy: Vacancy;
}

const getAuthToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return null;
};

export const applicationService = {
  applyJob: async (vacancyId: number): Promise<void> => {
    const token = getAuthToken();
    await axios.post(
      `${API_URL}/seeker/apply`,
      { vacancy_id: vacancyId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  },

  getMyApplications: async (): Promise<Application[]> => {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/seeker/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
};
