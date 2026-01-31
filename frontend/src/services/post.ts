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

export const updatePost = async (id: number, message: string) => {
  const res = await api.put(`/posts/${id}`, { message });
  return res.data;
};

export const deletePost = async (id: number) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

export const toggleLike = async (postId: number) => {
  const res = await fetch(
    `http://localhost:3000/posts/${postId}/like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error toggling like");
  }

  return res.json();
};
