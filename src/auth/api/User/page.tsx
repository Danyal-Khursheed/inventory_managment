import axios from 'axios';

import api from '../../../constants/baseUrl';

export const fetchAllUsers = async (pageNumber = 1, pageSize = 10) => {
  const { data } = await api.get('dashboardUsers/get-all-users', {
    params: { pageNumber, pageSize }
  });
  console.log('API response:', data);
  return data;
};
