import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-api-y04b.onrender.com',
});

const fipeApi = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1',
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

export interface CarBrand {
  name: string;
  code: string;
}

export const signIn = async (credentials: SignInCredentials): Promise<SignInResponse> => {
  const response = await api.post<SignInResponse>('/signIn', credentials);
  return response.data;
};

export const getCarBrands = async (): Promise<CarBrand[]> => {
  const response = await fipeApi.get<{ nome: string; codigo: string }[]>('/carros/marcas');
  return response.data.map(brand => ({
    name: brand.nome,
    code: brand.codigo
  }));
};

export default api; 