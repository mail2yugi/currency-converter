import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./pages/NavBar";
import Converter from "./pages/coverter/Converter";
import ConversionHistory from "./pages/conversion-history/ConversionHistory";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/history" element={<ConversionHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
