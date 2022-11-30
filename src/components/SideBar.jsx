import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/adminSlice";
import { empty_admins } from "../redux/allAdminsSlice";
import { empty_products } from "../redux/productsSlice";
import styles from "../modules/SideBar.module.css";
import { empty_orders } from "../redux/ordersSlice";
import { empty_categories } from "../redux/categorySlice";

function SideBar() {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(empty_admins());
    dispatch(empty_products());
    dispatch(empty_orders());
    dispatch(empty_categories());
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className={`d-flex flex-column justify-content-between ${styles.sideBar}`}
    >
      <div>
        <div className="mt-3 ms-3">
          <svg
            width="100px"
            height="31,786px"
            viewBox="0 0 280 89"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <title>GoPro Logo</title>
            <desc>Created with Sketch.</desc>
            <defs>
              <polygon
                id="path-1"
                points="0 88.3391 279.929 88.3391 279.929 0.0001 0 0.0001"
              ></polygon>
            </defs>
            <g
              id="GoPro-Logo"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g id="Page-1">
                <path
                  d="M101.8203,33.2808 C108.7543,33.2808 112.0433,32.0908 112.0433,29.6688 L112.0433,17.6408 C112.0433,15.2198 108.7543,14.0298 101.8203,14.0298 L86.9273,14.0298 C79.9943,14.0298 76.7063,15.2198 76.7063,17.6408 L76.7063,29.6688 C76.7063,32.0908 79.9943,33.2808 86.9273,33.2808 L101.8203,33.2808 Z M101.8203,38.9758 L86.9273,38.9758 C74.5273,38.9758 68.3303,35.7718 68.3303,29.2188 L68.3303,18.0928 C68.3303,11.5388 74.5273,8.3288 86.9273,8.3288 L101.8203,8.3288 C114.2203,8.3288 120.4193,11.5388 120.4193,18.0928 L120.4193,29.2188 C120.4193,35.7718 114.2203,38.9758 101.8203,38.9758 Z"
                  id="Fill-1"
                  fill="#FFFFFF"
                ></path>
                <g
                  id="Group-5"
                  transform="translate(227.000000, 7.339100)"
                  fill="#FFFFFF"
                >
                  <path
                    d="M34.3301,25.9417 L19.4381,25.9417 C12.5061,25.9417 9.2171,24.7517 9.2171,22.3297 L9.2171,10.3017 C9.2171,7.8817 12.5061,6.6917 19.4381,6.6917 L34.3301,6.6917 C41.2641,6.6917 44.5531,7.8817 44.5531,10.3017 L44.5531,22.3297 C44.5531,24.7517 41.2641,25.9417 34.3301,25.9417 Z M34.3301,31.6367 C46.7301,31.6367 52.9291,28.4327 52.9291,21.8807 L52.9291,10.7537 C52.9291,4.2007 46.7301,0.9917 34.3301,0.9917 L19.4381,0.9917 C7.0391,0.9917 0.8411,4.2007 0.8411,10.7537 L0.8411,21.8807 C0.8411,28.4327 7.0391,31.6367 19.4381,31.6367 L34.3301,31.6367 Z"
                    id="Fill-3"
                  ></path>
                </g>
                <path
                  d="M59.7471,29.0763 L59.7471,21.3823 C59.7471,19.7153 58.7201,18.9563 56.6511,18.9563 L38.4951,18.9563 C36.8551,18.9563 35.5161,20.3603 35.5161,22.0723 C35.5161,23.7893 36.8551,25.1913 38.4951,25.1913 L50.9141,25.1913 L50.9141,29.3283 C50.9141,30.5693 49.3011,31.7693 46.5961,32.4983 C44.4481,33.0763 42.6561,33.1323 40.7541,33.1323 L20.7811,33.1323 C12.8211,33.1323 8.8331,31.8153 8.8331,29.1723 L8.8331,9.6313 C8.8331,6.9963 13.5931,5.7733 23.0961,5.7733 L28.7121,5.7733 C30.8591,5.7733 31.9371,4.8053 31.9371,2.8763 C31.9371,0.9573 30.8591,0.0003 28.7121,0.0003 L20.7431,0.0003 C15.9341,0.0003 11.5071,0.5283 7.5591,1.8853 C3.0671,3.4283 0.0001,6.1423 0.0001,9.6473 L0.0001,29.2113 C0.0001,32.8533 2.4761,35.5003 7.4091,37.1543 C10.9981,38.3673 15.4131,38.9753 20.6741,38.9753 L40.7401,38.9753 C45.6371,38.9753 49.7831,38.3013 53.1851,36.9563 C57.5631,35.2373 59.7471,32.6113 59.7471,29.0763"
                  id="Fill-6"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M180.8223,15.1905 C180.8223,18.3345 176.8983,19.2455 169.2153,19.2455 L137.9913,19.2455 L137.9913,5.7735 L169.2153,5.7735 C176.8983,5.7735 180.8223,6.6855 180.8223,9.8285 L180.8223,15.1905 Z M181.9683,1.6395 C178.4583,0.5905 174.2043,0.0005 169.2153,0.0005 L131.6803,0.0005 C130.2893,0.0005 129.1603,1.1275 129.1603,2.5195 L129.1603,36.4215 C129.1603,38.1275 130.2213,38.9755 132.2623,38.9755 L134.8883,38.9755 C136.9303,38.9755 137.9913,38.1275 137.9913,36.4215 L137.9913,25.0195 L169.2153,25.0195 C174.5293,25.0195 178.6153,24.4365 182.3763,23.1935 C187.2033,21.4205 189.6553,18.6015 189.6553,14.7395 L189.6553,8.6485 C189.6553,5.5655 187.1213,3.2095 181.9683,1.6395 Z"
                  id="Fill-8"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M218.8848,8.3306 C211.1828,8.3306 207.9228,8.1906 203.3608,10.0616 C199.0698,11.8226 197.2418,14.9176 197.2418,17.7656 L197.2418,36.5436 C197.2418,38.1676 198.2528,38.9756 200.1978,38.9756 L202.6978,38.9756 C204.6418,38.9756 205.6518,38.1676 205.6518,36.5436 L205.6518,17.7656 C205.6518,15.1426 208.9028,14.0306 215.3448,14.0306 L218.9448,14.0306 C221.0478,14.0306 222.0458,13.0696 222.0458,11.1796 C222.0458,9.2986 220.9888,8.3306 218.8848,8.3306"
                  id="Fill-10"
                  fill="#FFFFFF"
                ></path>
                <mask id="mask-2" fill="white">
                  <use xlinkHref="#path-1"></use>
                </mask>
                <g id="Clip-13"></g>
                <polygon
                  id="Fill-12"
                  fill="#009FDF"
                  mask="url(#mask-2)"
                  points="0 88.3391 60.739 88.3391 60.739 48.5761 0 48.5761"
                ></polygon>
                <polygon
                  id="Fill-14"
                  fill="#009FDF"
                  mask="url(#mask-2)"
                  points="73.063 88.3391 133.802 88.3391 133.802 48.5761 73.063 48.5761"
                ></polygon>
                <polygon
                  id="Fill-15"
                  fill="#005DAC"
                  mask="url(#mask-2)"
                  points="146.125 88.3391 206.864 88.3391 206.864 48.5761 146.125 48.5761"
                ></polygon>
                <polygon
                  id="Fill-16"
                  fill="#FFFFFF"
                  mask="url(#mask-2)"
                  points="219.188 88.3391 279.926 88.3391 279.926 48.5761 219.188 48.5761"
                ></polygon>
              </g>
            </g>
          </svg>
        </div>
        <div className="mt-5 ms-3">
          <h4 className={`${styles.title}`}>Dashboard</h4>
          <small className={`${styles.title}`}>Welcome, {admin.name}</small>
          <div className="d-flex flex-column mt-4">
            <Link to="/" className={styles.sidebarLink}>
              Overview
            </Link>
            <Link to="/orders" className={styles.sidebarLink}>
              Orders
            </Link>
            <Link to="/products" className={styles.sidebarLink}>
              Products
            </Link>
            <Link to="/admins" className={styles.sidebarLink}>
              Admins
            </Link>
            <Link to="/categories" className={styles.sidebarLink}>
              Categories
            </Link>
          </div>
        </div>
      </div>

      <div className="ms-3 mb-2">
        <p className={`${styles.sidebarLink} mb-1`} onClick={handleClick}>
          Log Out
        </p>
        <a href={process.env.REACT_APP_MAIN_URL} className={`${styles.sidebarLink}`}>
          Return
        </a>
      </div>
    </div>
  );
}

export default SideBar;
