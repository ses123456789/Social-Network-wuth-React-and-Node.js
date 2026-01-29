import { useState } from "react";
import { createPost } from "../services/post";

const CreatePost = ({ onCreated }: { onCreated: () => void }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await createPost(content);
    setContent("");
    onCreated();
  };

  return (
    <div>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default CreatePost;
