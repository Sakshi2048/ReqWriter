import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Output from "./pages/Output";
import Projects from "./pages/Projects";
import Workflow from "./pages/Workflow";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/output" element={<Output />} />
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/flow" element={<Workflow/>}/>
    </Routes>
  );
}

export default App;
