import { Route, Routes } from "react-router-dom"
import LandingPage from "./components/login/Index"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App
