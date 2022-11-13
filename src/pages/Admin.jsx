import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../modules/Admin.module.css";

function Admin() {
  const [admins, setAdmins] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getAdmins = async () => {
      const response = await axios({
        url: "http://localhost:8000/admin",
        method: "GET",
      });
      setAdmins(response.data);
    };
    const getProducts = async () => {
      const response = await axios({
        url: "http://localhost:8000/product",
        method: "GET",
      });
      setProducts(response.data);
    };
    getAdmins();
    getProducts();
  }, []);

  const handleClick = async (id) => {
    await axios({
      url: `http://localhost:8000/admin/${id}`,
      method: "DELETE",
    });
  };

  return (
    admins &&
    products && (
      <div className={`${styles.fullScreen}`}>
        <div className={`row justify-content-center ${styles.adminTable}`}>
          <div className="col-2">
            <h4 className={`${styles.texts} ${styles.headers}`}>Admins</h4>
            {admins.map((admin) => {
              return (
                <div key={admin._id} className="d-flex justify-content-between">
                  <p className={`${styles.texts}`}>
                    {admin.firstname} {admin.lastname}
                  </p>
                  <p
                    onClick={() => {
                      handleClick(admin._id);
                    }}
                    className={`${styles.texts}`}
                  >
                    X
                  </p>
                </div>
              );
            })}
          </div>
          <div className={`col-2 ${styles.productCol}`}>
            <h4 className={`${styles.texts} ${styles.headers}`}>Products</h4>
            {products.map((product) => {
              return (
                <div key={product._id}>
                  <Link to={`/admin/${product._id}`} className="d-flex">
                    <p className={styles.texts}>{product.name}</p>
                    <p className={styles.texts}>{product.stock}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default Admin;
