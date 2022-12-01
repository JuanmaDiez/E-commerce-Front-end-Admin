import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eachDayOfInterval, format } from "date-fns";
import { call_orders } from "../redux/ordersSlice";
import { Line } from "react-chartjs-2";
import SideBar from "../components/SideBar";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { call_products } from "../redux/productsSlice";
import styles from "../modules/Home.module.css";
import { call_admins } from "../redux/allAdminsSlice";

function Overview() {
  const orders = useSelector((state) => state.order);
  const admin = useSelector((state) => state.admin);
  const products = useSelector((state) => state.product);
  const allAdmins = useSelector((state) => state.allAdmin);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const [productsSold, setProductsSold] = useState(null);

  useEffect(() => {
    ChartJS.register(CategoryScale);
    const getOrders = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/orders`,
        method: "GET",
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      dispatch(call_orders(response.data));
    };
    getOrders();
    const getProducts = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/products`,
        method: "GET",
      });
      dispatch(call_products(response.data));
    };
    getProducts();
    const getAdmins = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/admins`,
        method: "GET",
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      dispatch(call_admins(response.data));
    };
    getAdmins();
    const getDates = async () => {
      await setDates(
        eachDayOfInterval({
          start: new Date(orders[0].createdAt),
          end: new Date(),
        }).map((date) => {
          return format(date, "yyyy-MM-dd");
        })
      );
    };
    getDates();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      if (dates) {
        let products = [];
        for (let date of dates) {
          let counter = 0;
          for (let order of orders) {
            if (format(new Date(order.createdAt), "yyyy-MM-dd") === date) {
              const count = order.products.reduce(
                (acc, current) => acc + current.quantity,
                0
              );
              counter = counter + count;
            }
          }
          products.push(counter);
        }
        await setProductsSold(products);
      }
    };
    getProducts();
  }, [dates]);

  useEffect(() => {
    const getData = async () => {
      if (productsSold)
        await setData({
          labels: dates.map((date) => date),
          datasets: [
            {
              label: "Sales chart",
              data: productsSold.map((product) => product),
              backgroundColor: "rgba(9, 129, 176, 0.2)",
              fill: {
                target: "origin",
                below: "rgba(234,234,234,0)",
              },
            },
          ],
        });
    };
    getData();
  }, [productsSold]);
  console.log(dates, productsSold, data);

  return (
    allAdmins.length &&
    products.length &&
    data && (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0">
            <SideBar />
          </div>
          <div className={`col-10 ${styles.overviewBody}`}>
            <h4 className={`m-3 ${styles.title}`}>Overview</h4>
            <div className="row justify-content-center">
              <div className="col-8">
                <Line
                  redraw={true}
                  data={data}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Sales since e-commerce deployment",
                      },
                    },
                  }}
                />
              </div>
              <div className="col-2">
                <div className={`${styles.info} p-2`}>
                  <h6>Profits:</h6>
                  <p>
                    ${orders.reduce((acc, current) => acc + current.price, 0)}
                  </p>
                </div>
                <div className={`${styles.info} p-2 mt-3`}>
                  <h6>Orders:</h6>
                  <p>{orders.length}</p>
                  <h6>Delivered:</h6>
                  <p>
                    {orders.reduce(
                      (acc, current) => (current.state === 4 ? acc + 1 : acc),
                      0
                    )}
                  </p>
                </div>
                <div className={`${styles.info} p-2 mt-3`}>
                  <h6>Products sold:</h6>
                  <p>
                    {" "}
                    {productsSold.reduce((acc, current) => acc + current, 0)}
                  </p>
                </div>
              </div>
              <div className={`col-2 ${styles.info} p-2 m-2`}>
                <h6>Total products:</h6>
                <p>{products.length}</p>
              </div>
              <div className={`col-2 ${styles.info} p-2 m-2`}>
                <h6>Total stock:</h6>
                <p>
                  {products.reduce((acc, current) => acc + current.stock, 0)}
                </p>
              </div>
              <div className={`col-2 ${styles.info} p-2 m-2`}>
                <h6>Products out of stock:</h6>
                <p>
                  {products.reduce(
                    (acc, current) => (current.stock === 0 ? acc + 1 : acc),
                    0
                  )}
                </p>
              </div>
              <div className={`col-2 ${styles.info} p-2 m-2`}>
                <h6>Employees:</h6>
                <p>{allAdmins.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Overview;
