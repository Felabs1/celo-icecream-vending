import React from "react";
import { Navigate } from "react-router-dom";
import DashboardCards from "../components/DashboardCards";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";

const Dashboard = () => {
  return (
    <>
      <SideNav />
      {window.celo.selectedAddress == null && <Navigate to="/login"></Navigate>}
      <Main>
        <Navbar pageName="Dashboard" />
        <br />
        <DashboardCards />
      </Main>
    </>
  );
};

export default Dashboard;
