import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearAuthError } from "../features/auth/authSlice";

const RouteWatcher = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthError());
  }, [location.pathname, dispatch]);

  return null;
}

export default RouteWatcher;