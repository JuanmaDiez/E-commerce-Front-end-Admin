import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/adminSlice";
import styles from "../modules/Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const getToken = async () => {
      try {
        const response = await axios({
          url: `${process.env.REACT_APP_API_URL}/admins/login`,
          method: "POST",
          data: { email, password },
        });
        dispatch(login(response.data));
        navigate("/");
      } catch (error) {
        toast.error("Incorrect email or password");
      }
    };
    getToken();
  };

  return (
    <div
      className={`${styles.logInContainer} d-flex justify-content-center align-items-center`}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        onSubmit={(event) => handleSubmit(event)}
        className={`${styles.logInForm} d-flex flex-column justify-content-between align-items-start p-3`}
      >
        <h4>Log in</h4>
        <div className="d-flex">
          <div>
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
          </div>
          <div className="ps-5">
            <small>
              If you want to log in as an Admin, use the following credentials:
            </small>
            <div>
              <small>Email: admin@gmail.com</small>
            </div>
            <div>
              <small>Password: 123456</small>
            </div>
          </div>
        </div>
        <div
          className={`d-flex justify-content-between ${styles.formParagraph} mt-2`}
        >
          <button type="submit" className="btn btn-dark pt-0 pb-0">
            Log In
          </button>
          <p className="mt-2">
            Don't have an account?{" "}
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
