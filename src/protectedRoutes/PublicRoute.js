import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.entries(admin).length !== 0) {
      navigate("/");
    }
  }, []);
  return children;
}

export default PublicRoute;
