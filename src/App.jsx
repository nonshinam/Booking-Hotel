import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Page/Home/Home";
import List from "./Page/List/List";
import Hotel from "./Page/Hotel/Hotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
