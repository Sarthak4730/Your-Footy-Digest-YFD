import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SelectFavs from "./pages/SelectFavs";
import ProtectedRoute from "./components/ProtectedRoute";
import Fixtures from "./pages/Fixtures";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Landing/> }/>
        <Route path="/register" element={ <Register/> }/>
        <Route path="/select-favs" element={ <SelectFavs/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route
          path="/fixtures"
          element={
            <ProtectedRoute>
              <Fixtures/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;