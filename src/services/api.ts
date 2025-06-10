import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-api-y04b.onrender.com',
});

export interface SignInCredentials {
  user: string;
  password: string;
}

export interface SignInResponse {
    user: {
        id: string;
        name: string;
        token: string;
  };
}

export const signIn = async (credentials: SignInCredentials): Promise<SignInResponse> => {
  const response = await api.post<SignInResponse>('/signIn', credentials);
  return response.data;
};

export default api; 