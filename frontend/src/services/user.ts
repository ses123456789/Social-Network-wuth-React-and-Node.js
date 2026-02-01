import api from "./api";

export type ApiUser = {
  id: number;
  username: string;
};

export const searchUsers = async (query: string): Promise<ApiUser[]> => {
  if (!query.trim()) return [];

  const res = await api.get(`/users?search=${query}`);
  return res.data;
};
