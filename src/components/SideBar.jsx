import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/adminSlice";
import { empty_admins } from "../redux/allAdminsSlice";
import { empty_products } from "../redux/productsSlice";
import styles from "../modules/SideBar.module.css";

function SideBar() {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(empty_admins());
    dispatch(empty_products());
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={`d-flex flex-column justify-content-around ${styles.sideBar}`}>
      <h3 className={styles.title}>Menu</h3>
      <div className="d-flex flex-column">
        <Link to="/" className={styles.sidebarLink}>Home</Link>
        <Link to="/products" className={styles.sidebarLink}>Products</Link>
        <Link to="/admins" className={styles.sidebarLink}>Admins</Link>
      </div>
      <div>
        <button className="btn btn-danger" onClick={handleClick}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;