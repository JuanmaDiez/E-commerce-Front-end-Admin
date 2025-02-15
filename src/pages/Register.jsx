import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../modules/Register.module.css";
import { ToastContainer, toast } from "react-toastify";
import { adminRegister } from "../controllers/adminController";
import { USER_CREATED } from "../constants/successMessage";
import { useDispatch } from "react-redux";
import { login } from "../redux/adminSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await adminRegister(firstname, lastname, email, password);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    const admin = response.admin;
    const token = response.token;
    dispatch(login({ token, admin }));
    toast.success(USER_CREATED);
    navigate("/");
  };

  return (
    <div
      className={`${styles.registerContainer} d-flex justify-content-center align-items-center`}
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
        onSubmit={handleSubmit}
        className={`${styles.registerForm} d-flex flex-column justify-content-between align-items-start p-3`}
      >
        <h4>Register</h4>
        <div className="form-group">
          <label htmlFor="">First name</label>
          <input
            type="text"
            onChange={(event) => setFirstname(event.target.value)}
            className={`${styles.registerInput} form-control`}
            name="firstname"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Last name</label>
          <input
            type="text"
            onChange={(event) => setLastname(event.target.value)}
            className={`${styles.registerInput} form-control`}
            name="lastname"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            className={`${styles.registerInput} form-control`}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className={`${styles.registerInput} form-control`}
            name="password"
          />
        </div>
        <div
          className={`d-flex justify-content-between ${styles.formParagraph} mt-2`}
        >
          <button type="submit" className="btn btn-dark pt-0 pb-0">
            Register
          </button>
          <p className="mt-2">
            Already registered?{" "}
            <Link to="/login" className={styles.registerLink}>
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
