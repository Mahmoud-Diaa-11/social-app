import { Navigate } from "react-router-dom";

function ProtectRoutes({ children }) {
  if (localStorage.getItem("token") != null) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default ProtectRoutes;
