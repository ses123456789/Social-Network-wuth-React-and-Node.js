import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts,getMyPosts } from "../services/post";
import CreatePost from "../components/CreatePost";
import { getLoggedUser } from "../utils/auth.ts"
import { toggleLike } from "../services/post";
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
  likesCount?: number | string;
   likedByMe: boolean;
   createdAt: string;
};
///Type in front
type Post = {
  id: number;
  message: string;
  username: string;
  liked: boolean;
  likesCount: number;
  createdAt: string;

};

const Posts = () => {
  
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
   const loggedUser = getLoggedUser();

 const normalizePosts = (data: ApiPost[]): Post[] => {
  return data.map((post) => ({
    id: post.id,
    message: post.message,
    username: post.User?.username ?? "unknown",
    likesCount: Number(post.likesCount ?? 0),
    liked: post.likedByMe,
    createdAt: post.createdAt,
  }));
};


 const loadAll = async () => {
    const data = await getPosts();
    setAllPosts(normalizePosts (data));
  };

  const loadMine = async () => {
    const data = await getMyPosts();
    setMyPosts(normalizePosts (data));
  };
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
 useEffect(() => {
  const init = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const [all, mine] = await Promise.all([
      getPosts(),
      getMyPosts(),
    ]);

    setAllPosts(normalizePosts(all));
    setMyPosts(normalizePosts(mine));
  };

  init();
}, [navigate]);

const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const handleLike = async (postId: number) => {
  try {
    await toggleLike(postId);

    setAllPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likesCount: post.liked
                ? post.likesCount - 1
                : post.likesCount + 1,
            }
          : post
      )
    );

    setMyPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likesCount: post.liked
                ? post.likesCount - 1
                : post.likesCount + 1,
            }
          : post
      )
    );
  } catch (err) {
    console.error("Like error", err);
  }
};



 
   return (
    <div className="feed-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <p>👤 {loggedUser}</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>

        <hr />

        <CreatePost
          onCreated={() => {
            loadAll();
            loadMine();
          }}
        />

        <h4>My posts</h4>
        {myPosts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.message}</p>
          </div>
        ))}
      </aside>

      {/* MAIN FEED */}
      <main className="main-feed">
        <h2>Global feed</h2>

     {allPosts.map((post) => (
  <div key={post.id} className="post">
    <p>{post.message}</p>
    <small>
        by <b>{post.username}</b> · {formatDate(post.createdAt)}
        </small>

    <button
            className={`like-btn ${post.liked ? "liked" : ""}`}
             onClick={() => handleLike(post.id)}
         >
            {post.liked ? "❤️" : "🤍"}
            <span>{post.likesCount}</span>
        </button>
     </div>
))}
      </main>
    </div>
  );
};

export default Posts;
