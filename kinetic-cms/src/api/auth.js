import { publicApi } from '@config/client';

export const logInUser = async (data) => {
  const response = await publicApi.post('/auth/login', data);
  return response.data;
}

export const logOutUser = async () => {
  const response = await publicApi.post('/auth/logout');
  return response.data;
}

export const refreshUser = async () => {
  const response = await publicApi.post('/auth/refresh');
  return response.data;
}