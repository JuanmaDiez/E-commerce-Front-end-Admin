import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.entries(admin).length === 0) {
      navigate("/login");
    }
  }, []);
  return children;
}

export default ProtectedRoute;
