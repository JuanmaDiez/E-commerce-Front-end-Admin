import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/adminSlice";
import styles from "../modules/Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminLogin } from "../controllers/adminController";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await adminLogin(email, password);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    const admin = response.admin;
    const token = response.token;

    dispatch(login({ admin, token }));
    navigate("/");
  };

  return (
    <div className={styles.logIn}>
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
      <div className="container">
        <div className="d-flex justify-content-center">
          <form
            className={`${styles.logInForm}`}
            onSubmit={(event) => handleSubmit(event)}
          >
            <h4 className={`${styles.title}`}>Log in</h4>
            <div className="form-group mb-2">
              <label htmlFor="exampleFormControlInput1">Email address</label>
              <input
                type="text"
                className={styles.inputLogin + " form-control"}
                id="exampleFormControlInput1"
                name="email"
                placeholder="Email..."
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="exampleFormControlInput2">Password</label>
              <input
                type="password"
                className={styles.inputLogin + " form-control"}
                id="exampleFormControlInput2"
                name="password"
                placeholder="Password..."
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <button type="submit" className="btn btn-dark mt-2">
                  Sign in
                </button>
              </div>
            </div>
            <hr />
            <div>
              <small className={styles.credentials}>
                If you want to log in as an Admin, use the following
                credentials:
              </small>
              <div>
                <small>Email: admin@gmail.com</small>
              </div>
              <div>
                <small>Password: 123456</small>
              </div>
            </div>
            <hr />
            <small>
              If you want to go back to the main project,
              <a
                href={process.env.REACT_APP_MAIN_URL}
                className={styles.adminLink}
              >
                click here!
              </a>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
