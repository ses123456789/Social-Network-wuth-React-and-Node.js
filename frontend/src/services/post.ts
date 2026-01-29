import api from "./api.ts";

export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};
export const getMyPosts = async () => {
  const res = await api.get("/posts/me");
  return res.data;
};
export const createPost = async (message: string) => {
  const res = await api.post("/posts", { message });
  return res.data;
};
