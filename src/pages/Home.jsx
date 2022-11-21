import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import styles from "../modules/Home.module.css";
import { call_orders, edit_order } from "../redux/ordersSlice";

function Home() {
  const orders = useSelector((state) => state.order);
  const admin = useSelector((state) => state.admin);
  const [state, setState] = useState("Paid");
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/orders`,
        method: "GET",
        headers: `Bearer ${admin.token}`,
      });
      dispatch(call_orders(response.data));
    };
    getOrders();
  }, []);

  const handleClick = async (id) => {
    dispatch(edit_order({ state, id }));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/orders/${id}`,
      method: "PATCH",
      data: { state },
      headers: `Bearer ${admin.token}`
    });
  };

  return (
    orders.length && (
      <div className="row">
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
                  {order.user.firstname} {order.user.lastname}
                </p>
                <p className="col-3">${order.price.toFixed(2)}</p>
                <p className="col-3">{order.createdAt}</p>
                {order.state === "Not paid" ? (
                  <p
                    className="col-2 btn btn-warning"
                    onClick={() => {
                      setState("Paid");
                      handleClick(order._id);
                    }}
                  >
                    Pending
                  </p>
                ) : null}
                {order.state === "Paid" ? (
                  <p
                    className="col-2 btn btn-primary"
                    onClick={() => {
                      setState("Sent");
                      handleClick(order._id);
                    }}
                  >
                    {order.state}
                  </p>
                ) : null}
                {order.state === "Sent" ? (
                  <p
                    className="col-2 btn btn-info"
                    onClick={() => {
                      setState("Delivered");
                      handleClick(order._id);
                    }}
                  >
                    {order.state}
                  </p>
                ) : null}
                {order.state === "Delivered" ? (
                  <p className="col-2 btn btn-success">{order.state}</p>
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
