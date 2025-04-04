import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Events from "./modules/events/Events";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Events />} />
      </Route>
    </Routes>
  );
}

export default App;
