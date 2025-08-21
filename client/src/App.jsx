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
        <Route path="/login" element={ <Login/> }/>
        
        <Route element={ <ProtectedRoute /> }>
          <Route path="/select-favs" element={ <SelectFavs/> } />
          <Route path="/fixtures" element={ <Fixtures/> } />
        </Route>
        
        <Route path="*" element={ <Login/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;