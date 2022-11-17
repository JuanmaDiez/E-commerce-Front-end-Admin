import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import styles from "../modules/Home.module.css";
import { call_orders, edit_order } from "../redux/ordersSlice";

function Home() {
  const orders = useSelector((state) => state.order);
  const [state, setState] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/orders`,
        method: "GET",
      });
      dispatch(call_orders(response.data));
    };
    getOrders();
  }, []);

  const handleClick = async (id, string) => {
    setState(string);
    dispatch(edit_order({ state, id }));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/orders/${id}`,
      method: "PATCH",
      data: { state },
    });
  };

  return (
    orders.length && (
      <div className="row">
        <div className="col-2 p-0">
          <SideBar />
        </div>
        <div className={`col-10 ${styles.homeBody} p-0`}>
          <h4 className="m-3">Orders list</h4>
          {orders.map((order, index) => {
            return (
              <div key={order._id} className="d-flex justify-content-around">
                <p>{index}</p>
                <p>
                  <strong>Buyer:</strong> {order.user.firstname}
                  {order.user.lastname}
                </p>
                <p>
                  <strong>Price:</strong> ${order.price}
                </p>
                {order.state === "Not paid" ? (
                  <p
                    className="btn btn-warning"
                    onClick={() => {
                      handleClick(order._id, "Paid");
                    }}
                  >
                    {order.state}
                  </p>
                ) : null}
                {order.state === "Paid" ? (
                  <p
                    className="btn btn-primary"
                    onClick={() => {
                      handleClick(order._id, "Sent");
                    }}
                  >
                    {order.state}
                  </p>
                ) : null}
                {order.state === "Sent" ? (
                  <p
                    className="btn btn-info"
                    onClick={() => {
                      handleClick(order._id, "Delivered");
                    }}
                  >
                    {order.state}
                  </p>
                ) : null}
                {order.state === "Delivered" ? (
                  <p className="btn btn-success">{order.state}</p>
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
