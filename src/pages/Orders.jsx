import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import styles from "../modules/Home.module.css";
import { call_orders, edit_order } from "../redux/ordersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import Table from "react-bootstrap/Table";

function Orders() {
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
          <div className={`col-10`}>
            <h4 className={`m-3 ${styles.title}`}>Orders</h4>
            <div className="row justify-content-center">
              <div className="col-10">
                <Table striped bordered hover>
                  <thead className="thead-light">
                    <tr>
                      <th scope="row" className="col-1">
                        #
                      </th>
                      <th className="col-2">Customer</th>
                      <th className="col-2">Price</th>
                      <th className="col-2">Date</th>
                      <th className="col-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      return (
                        <tr key={order._id} className={`${styles.orderRow}`}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {order.user
                              ? `${order.user.firstname} ${order.user.lastname}`
                              : "Anonymous"}
                          </td>
                          <td>${order.price.toFixed(2)}</td>
                          <td>
                            {format(new Date(order.createdAt), "yyyy-MM-dd")}
                          </td>
                          {order.state === 1 ? (
                            <td
                              onClick={() => {
                                handleClick(order._id);
                              }}
                            >
                              <div className="progress">
                                <div
                                  className="progress-bar bg-warning"
                                  role="progressbar"
                                  style={{ width: "25%" }}
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  Pending
                                </div>
                              </div>
                            </td>
                          ) : null}
                          {order.state === 2 ? (
                            <td
                              onClick={() => {
                                handleClick(order._id);
                              }}
                            >
                              <div className="progress">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{ width: "50%" }}
                                  aria-valuenow="50"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  Paid
                                </div>
                              </div>
                            </td>
                          ) : null}
                          {order.state === 3 ? (
                            <td
                              onClick={() => {
                                handleClick(order._id);
                              }}
                            >
                              <div className="progress">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: "75%" }}
                                  aria-valuenow="75"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  Sent
                                </div>
                              </div>
                            </td>
                          ) : null}
                          {order.state === 4 ? (
                            <td>
                              {" "}
                              <div className="progress">
                                <div
                                  className="progress-bar bg-dark"
                                  role="progressbar"
                                  style={{ width: "100%" }}
                                  aria-valuenow="100"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  Delivered
                                </div>
                              </div>
                            </td>
                          ) : null}
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

export default Orders;
