
import services  from './api';   


export interface LoginCredentials {
   name : string;
  password: string;
}


export interface AuthResponse {
  accessToken: string;

  user: {
    id: string;
    email: string;
    name?: string;
    isAdmin?: boolean;
  };

}


const authApi = {
 

  async login(credentials: LoginCredentials): Promise<AuthResponse> {

    const response = await services.post<AuthResponse>('/auth/login', credentials);

    return response.data;
  },


  async register(data: { name: string; email: string; password: string }) {

    const response = await services.post<AuthResponse>('/auth/register', data);
    return response.data;
  },


  async getCurrentUser(): Promise<AuthResponse['user']>
   {
    const response = await services.get<AuthResponse['user']>('/auth/me');
    
    return response.data;
  },


  async refreshToken(): Promise<{ accessToken: string }> {
    const response = await services.post<{ accessToken: string }>('/auth/refresh');
    return response.data;
  },


  async logout(): Promise<{ message: string }> {
    const response = await services.post<{ message: string }>('/auth/logout');
    return response.data;
  },
};

export default authApi;