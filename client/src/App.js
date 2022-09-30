import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Previous from "./components/Previous/Previous";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<Previous />} />
      </Routes>
    </div>
  );
}

export default App;
