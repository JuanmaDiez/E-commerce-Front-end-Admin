import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "../modules/Home.module.css";

function Home() {
  return (
    <div className="row">
      <div className="col-2 p-0">
        <SideBar />
      </div>
      <div className={`col-10 ${styles.homeBody} p-0`}></div>
    </div>
  );
}

export default Home;
