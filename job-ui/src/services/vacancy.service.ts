import axios from "axios";

const API_URL = "http://localhost:8000/api";

export interface Vacancy {
  id: number;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  experience: string;
  created_at: string;
  active_until: string;
}

export interface CreateVacancyPayload {
  title: string;
  position: string;
  jobType: string;
  candidatesRequired: string;
  activeUntil: string;
  location: string;
  isRemote: boolean;
  description: string;
  minSalary: string;
  maxSalary: string;
  showSalary: boolean;
  minExperience: string;
}

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const vacancyService = {
  getVacancies: async (search?: string): Promise<Vacancy[]> => {
    const response = await axios.get(`${API_URL}/vacancies`, {
      params: { search },
    });
    return response.data.data;
  },

  // GET
  getMyVacancies: async (): Promise<Vacancy[]> => {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/recruiter/vacancies`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  // DELETE
  deleteVacancy: async (id: number): Promise<void> => {
    const token = getAuthToken();
    await axios.delete(`${API_URL}/recruiter/vacancies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //POST
  createVacancy: async (data: CreateVacancyPayload): Promise<Vacancy> => {
    const token = getAuthToken();
    const payload = {
      title: data.title,
      position: data.position,
      job_type: data.jobType,
      candidates_required: parseInt(data.candidatesRequired),
      active_until: data.activeUntil,
      location: data.location,
      is_remote: data.isRemote,
      description: data.description,
      min_salary: data.minSalary ? parseFloat(data.minSalary) : null,
      max_salary: data.maxSalary ? parseFloat(data.maxSalary) : null,
      show_salary: data.showSalary,
      min_experience: data.minExperience,
    };

    const response = await axios.post(
      `${API_URL}/recruiter/vacancies`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data.data;
  },

  getVacancyById: async (id: number): Promise<CreateVacancyPayload> => {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/recruiter/vacancies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const item = response.data.data;
    return {
      title: item.title,
      position: item.position,
      jobType: item.job_type,
      candidatesRequired: item.candidates_required.toString(),
      activeUntil: item.active_until,
      location: item.location,
      isRemote: item.is_remote,
      description: item.description,
      minSalary: item.min_salary ? item.min_salary.toString() : "",
      maxSalary: item.max_salary ? item.max_salary.toString() : "",
      showSalary: item.show_salary,
      minExperience: item.experience,
    };
  },

  // PUT: Update lowongan
  updateVacancy: async (
    id: number,
    data: CreateVacancyPayload,
  ): Promise<void> => {
    const token = getAuthToken();
    const payload = {
      title: data.title,
      position: data.position,
      job_type: data.jobType,
      candidates_required: parseInt(data.candidatesRequired),
      active_until: data.activeUntil,
      location: data.location,
      is_remote: data.isRemote,
      description: data.description,
      min_salary: data.minSalary ? parseFloat(data.minSalary) : null,
      max_salary: data.maxSalary ? parseFloat(data.maxSalary) : null,
      show_salary: data.showSalary,
      min_experience: data.minExperience,
    };

    await axios.put(`${API_URL}/recruiter/vacancies/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
