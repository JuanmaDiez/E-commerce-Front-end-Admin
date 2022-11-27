import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eachDayOfInterval, format } from "date-fns";
import { call_orders } from "../redux/ordersSlice";
import { Line } from "react-chartjs-2";
import SideBar from "../components/SideBar";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

function Testing2() {
  const orders = useSelector((state) => state.order);
  const admin = useSelector((state) => state.admin);
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
    data && (
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
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
      </div>
    )
  );
}

export default Testing2;
