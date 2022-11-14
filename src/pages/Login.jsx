import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/adminSlice";
import styles from "../modules/Login.module.css";

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
    navigate("/");
  };

  return (
    <div
      className={`${styles.logInContainer} d-flex justify-content-center align-items-center`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${styles.logInForm} d-flex flex-column justify-content-between align-items-start p-3`}
      >
        <h4>Log in</h4>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            className={`${styles.logInInput} form-control`}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className={`${styles.logInInput} form-control`}
            name="password"
          />
        </div>
        <div
          className={`d-flex justify-content-between ${styles.formParagraph} mt-2`}
        >
          <button type="submit" className="btn btn-dark pt-0 pb-0">
            Log In
          </button>
          <p className="mt-2">
            Don't have an account?
            <Link to="/register" className={styles.loginLink}>
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
