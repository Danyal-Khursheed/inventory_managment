import api from '@/lib/api';

export interface User {
  item?: string;
  size?: string | number;
  name?: string;
  color?: string;
  sku?: string;
  quantity?: number;
  upc?: string;
  [key: string]: any;
}

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
}

export const usersService = {
  getAllUsers: async (
    pageNumber = 1,
    pageSize = 10
  ): Promise<UsersResponse> => {
    const { data } = await api.get<UsersResponse>(
      '/dashboardUsers/get-all-users',
      {
        params: { pageNumber, pageSize }
      }
    );
    return data;
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    const { data } = await api.post<User>('/dashboardUsers/create', userData);
    return data;
  },

  updateUser: async (
    userId: string,
    userData: Partial<User>
  ): Promise<User> => {
    const { data } = await api.put<User>(
      `/dashboardUsers/update/${userId}`,
      userData
    );
    return data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/dashboardUsers/delete/${userId}`);
  }
};
