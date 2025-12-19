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
    const { data } = await api.get<UsersResponse>('packages/get-all-packages', {
      params: { pageNumber, pageSize }
    });
    return data;
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    const { data } = await api.post<User>('/packages/create-package', userData);
    return data;
  },

  updateUser: async (
    userId: string,
    userData: Partial<User>
  ): Promise<User> => {
    const { data } = await api.patch<User>(
      `/packages/update-package?id=${userId}`,
      userData
    );
    return data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    console.log('DELETE API CALLED WITH ID:', userId);

    await api.delete('/packages/get-single-package', {
      params: { id: userId }
    });
  }
};
