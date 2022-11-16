import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import styles from "../modules/Home.module.css";
import { call_orders } from "../redux/ordersSlice";

function Home() {
  const orders = useSelector((state) => state.order);
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

  return (
    orders.length && (
      <div className="row">
        <div className="col-2 p-0">
          <SideBar />
        </div>
        <div className={`col-10 ${styles.homeBody} p-0`}>
          {orders.map((order, index) => {
            return (
              <div key={order._id} className="d-flex">
                <p>{index}</p>
                <p>{order.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default Home;
