import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { call_admins, delete_admin } from "../redux/allAdminsSlice";
import styles from "../modules/Admin.module.css";
import paperBasket from "../image/paperBasket.png";

function Admins() {
  const admin = useSelector((state) => state.admin);
  const allAdmins = useSelector((state) => state.allAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAdmins = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/admins`,
        method: "GET",
        headers: `Bearer ${admin.token}`,
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
      headers: `Bearer ${admin.token}`,
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
          <div className="row mt-2">
            <div className="col-1"></div>
            <h5 className="col-3">
              <strong>Firstname</strong>
            </h5>
            <h5 className="col-3">
              <strong>Lastname</strong>
            </h5>
            <h5 className="col-3">
              <strong>Email</strong>
            </h5>
            <h5 className="col-2">
              <strong>Action</strong>
            </h5>
          </div>
          {allAdmins.map((user, index) => {
            return (
              <div key={user._id} className={`row ${styles.userRow} mt-2`}>
                <small className="col-1">{index + 1}</small>
                <p className="col-3">{user.firstname}</p>
                <p className="col-3">{user.lastname}</p>
                <p className="col-3">{user.email}</p>
                <img
                  src={paperBasket}
                  className={`img-fluid col-2 ${styles.paperBasket}`}
                  alt="delete"
                  onClick={() => handleClick(user._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default Admins;
