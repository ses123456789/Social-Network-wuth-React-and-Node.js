import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Posts from "./pages/PostFeed";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
