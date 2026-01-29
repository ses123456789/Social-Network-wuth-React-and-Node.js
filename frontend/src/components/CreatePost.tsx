import { useState } from "react";
import { createPost } from "../services/post";
import "./CreatePost.css"

const CreatePost = ({ onCreated }: { onCreated: () => void }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await createPost(content);
    setContent("");
    onCreated();
  };

  return (
    <div className="create-post-container"> 
      <h4>What's on your mind?</h4>
      <textarea
        className="create-post-textarea" 
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        
      />
      <button className="create-post-btn" onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default CreatePost;