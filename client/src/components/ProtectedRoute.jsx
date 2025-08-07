import { Navigate } from "react-router-dom";

const ProtectedRoute = ( { children } ) => {
    const doneLogin = !!localStorage.getItem("token");
    return doneLogin ? children : <Navigate to="/login"/>;
}

export default ProtectedRoute;