import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/adminSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios({
      url: "http://localhost:8000/admin/login",
      method: "POST",
      data: { email, password },
    });
    dispatch(login(response.data));
    navigate("/dashboard");
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit">Log In</button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
