import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import styles from "../modules/Home.module.css";
import { call_orders, edit_order } from "../redux/ordersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

function Home() {
  const orders = useSelector((state) => state.order);
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/orders`,
        method: "GET",
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      dispatch(call_orders(response.data));
    };
    getOrders();
  }, []);

  const handleClick = async (id) => {
    dispatch(edit_order({ id }));
    toast.success("Succesfully changed state!");
    await axios({
      url: `${process.env.REACT_APP_API_URL}/orders/${id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${admin.token}` },
    });
  };
  return (
    orders.length && (
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
        <div className={`col-10`}>
          <h4 className="m-3">Orders list</h4>
          <div className="row mt-2">
            <div className="col-1"></div>
            <h5 className="col-3">
              <strong>Customer</strong>
            </h5>
            <h5 className="col-3">
              <strong>Cost</strong>
            </h5>
            <h5 className="col-3">
              <strong>Date</strong>
            </h5>
            <h5 className="col-2">
              <strong>State</strong>
            </h5>
          </div>
          {orders.map((order, index) => {
            return (
              <div key={order._id} className={`row ${styles.orderRow}`}>
                <p className="col-1">{index + 1}</p>
                <p className="col-3">
                  {order.user
                    ? `${order.user.firstname} ${order.user.lastname}`
                    : "Anonymous"}
                    Something failed
                </p>
                <p className="col-3">${order.price.toFixed(2)}</p>
                <p className="col-3">
                  {format(new Date(order.createdAt), "yyyy-MM-dd")}
                </p>
                {order.state === 1 ? (
                  <p
                    className="col-2 btn btn-warning"
                    onClick={() => {
                      handleClick(order._id);
                    }}
                  >
                    Pending
                  </p>
                ) : null}
                {order.state === 2 ? (
                  <p
                    className="col-2 btn btn-primary"
                    onClick={() => {
                      handleClick(order._id);
                    }}
                  >
                    Paid
                  </p>
                ) : null}
                {order.state === 3 ? (
                  <p
                    className="col-2 btn btn-success"
                    onClick={() => {
                      handleClick(order._id);
                    }}
                  >
                    Sent
                  </p>
                ) : null}
                {order.state === 4 ? (
                  <p className="col-2 btn btn-dark">Delivered</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default Home;
