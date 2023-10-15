import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const WithPrivateRoute = ({ children }: any) => {
  const currentUser = useAuth();

  if (currentUser == undefined) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default WithPrivateRoute;
