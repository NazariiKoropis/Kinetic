import { publicApi } from '@config/client';

const logInUser = async (data) => {
  const response = await publicApi.post('/auth/login', data);
  return response.data;
}

const logOutUser = async () => {
  const response = await publicApi.post('/auth/logout');
  return response.data;
}

const refreshUser = async () => {
  const response = await publicApi.post('/auth/refresh');
  return response.data;
}
export { logInUser, logOutUser, refreshUser };
