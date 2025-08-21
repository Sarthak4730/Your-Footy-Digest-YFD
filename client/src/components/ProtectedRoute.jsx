import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const favs = useSelector((state) => state.user.favs);

    if(!user) return <Navigate to="/login" replace />
    
    if( (!favs || favs.length === 0) && location.pathname !== "/select-favs" ) {
        return <Navigate to="/select-favs" replace />;
    }

    if(favs && favs.length > 0 && location.pathname === "/select-favs" ) {
        return <Navigate to="/fixtures" replace />;
    }
    
    return <Outlet/>;
}

export default ProtectedRoute;