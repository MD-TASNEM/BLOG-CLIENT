import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
