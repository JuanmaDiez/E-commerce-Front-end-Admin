import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { call_admins, delete_admin } from "../redux/allAdminsSlice";
import styles from "../modules/Admin.module.css";
import { empty_orders } from "../redux/ordersSlice";

function Admins() {
  const allAdmins = useSelector((state) => state.allAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAdmins = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/admins`,
        method: "GET",
      });

      dispatch(call_admins(response.data));
    };
    getAdmins();
  }, []);

  const handleClick = async (id) => {
    dispatch(delete_admin(id));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/admins/${id}`,
      method: "DELETE",
    });
  };

  return (
    allAdmins.length && (
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <h5 className="m-3">Administrators list</h5>
          {allAdmins.map((user, index) => {
            return (
              <div
                key={user._id}
                className={`d-flex justify-content-around ${styles.userRow} p-4`}
              >
                <small>{index + 1}</small>
                <p>
                  <strong>Name:</strong> {user.firstname} {user.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleClick(user._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default Admins;
