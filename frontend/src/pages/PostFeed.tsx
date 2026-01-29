import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/post";
import CreatePost from "../components/CreatePost";
import { getLoggedUser } from "../utils/auth.ts"
import "./PostFeed.css";
//Types from backend /api

type ApiUser = {
  id: number;
  username: string;
};

type ApiPost = {
  id: number;
  message: string;
  User?: ApiUser;
};
///Type in front
type Post = {
  id: number;
  message: string;
  username: string;
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   const loggedUser = getLoggedUser();

  const normalizePosts = (data: ApiPost[]): Post[] => {
    return data.map((post) => ({
      id: post.id,
      message: post.message,
      username: post.User?.username ?? "unknown",
    }));
  };

  const loadPosts = async () => {
    try {
      const data: ApiPost[] = await getPosts();
      setPosts(normalizePosts(data));
    } catch (error) {
      console.error("Error loading posts", error);
    } finally {
      setLoading(false);
    }
  };
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadPosts();
  }, [navigate]); 

  if (loading) {
    return <p>Loading posts...</p>;
  }

 
  return (
    <div className="feed-container">
      <div className="feed">
        {/* Header */}
        <div className="feed-header">
          <span>👤 {loggedUser}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <CreatePost onCreated={loadPosts} />

        {posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.message}</p>
            <small>by {post.username}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
