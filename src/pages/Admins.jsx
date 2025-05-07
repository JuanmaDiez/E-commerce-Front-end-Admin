import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import {
  call_admins,
  delete_admin,
  empty_admins,
} from "../redux/allAdminsSlice";
import styles from "../modules/Admin.module.css";
import paperBasket from "../image/paperBasket.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "react-bootstrap";
import { empty_products } from "../redux/productsSlice";
import { empty_categories } from "../redux/categorySlice";
import { empty_orders } from "../redux/ordersSlice";
import { logout } from "../redux/adminSlice";
import { adminDelete, adminIndex } from "../controllers/adminController";
import { useNavigate } from "react-router-dom";

function Admins() {
  const admin = useSelector((state) => state.admin);
  const allAdmins = useSelector((state) => state.allAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAdmins = async () => {
      const response = await adminIndex(admin.token);

      if (!response.success) {
        if (response.unauthorized) {
          dispatch(empty_products());
          dispatch(empty_admins());
          dispatch(empty_categories());
          dispatch(empty_orders());
          dispatch(logout());
          navigate("/login");
        }
        toast.error(response.message);
        return;
      }

      dispatch(call_admins(response.admins));
      toast.success(response.message);
    };
    getAdmins();
  }, []);

  const handleClick = async (id) => {
    const response = await adminDelete(admin.token, id);

    if (!response.success) {
      if (response.unauthorized) {
        dispatch(empty_products());
        dispatch(empty_admins());
        dispatch(empty_categories());
        dispatch(empty_orders());
        dispatch(logout());
        navigate("/login");
      }
      toast.error(response.message);
      return;
    }

    dispatch(delete_admin(id));
    toast.success("Admin deleted!");
  };

  return (
    allAdmins.length && (
      <div className="container-fluid">
        <div className="row">
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
          <div className="col-2 p-0">
            <SideBar />
          </div>
          <div className="col-10">
            <h4 className={`m-3 ${styles.title}`}>Administrators</h4>
            <div className="row justify-content-center">
              <div className="col-10">
                <Table striped bordered hover>
                  <thead className="thead-light">
                    <th scope="row" className="col-1">
                      #
                    </th>
                    <th className="col-2">Firstname</th>
                    <th className="col-2">Lastname</th>
                    <th className="col-2">Email</th>
                    <th className="col-1">Action</th>
                  </thead>
                  <tbody>
                    {allAdmins.map((user, index) => {
                      return (
                        <tr key={user._id} className={`${styles.userRow}`}>
                          <th>{index + 1}</th>
                          <td>{user.firstname}</td>
                          <td>{user.lastname}</td>
                          <td>{user.email}</td>
                          <td>
                            <img
                              src={paperBasket}
                              className={`img-fluid${styles.paperBasket}`}
                              alt="delete"
                              onClick={() => handleClick(user._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Admins;
