import {
  FaBaseballBall,
  FaChartArea,
  FaPlus,
  FaCartPlus,
  FaChartPie,
  FaDollarSign,
} from "react-icons/fa";
export const navbar = [
  {
    navName: "Dashboard",
    navLink: "/",
    navIcon: <FaChartArea />,
  },
  {
    navName: "Add Variety",
    navLink: "/add-variety",
    navIcon: <FaPlus />,
  },
  {
    navName: "Make Sales",
    navLink: "/make-sales",
    navIcon: <FaCartPlus />,
  },
];

export const dashCards = [
  {
    backgroundColor: "#0f2274",
    bigNumber: "80%",
    smallNumber: "+0.2%",
    cardLabel: "Daily Sales",
    dashCardIcon: <FaChartPie className="w3-large" />,
    color: "w3-text-green",
  },
  {
    backgroundColor: "#171d69",
    bigNumber: "78%",
    smallNumber: "-0.2%",
    cardLabel: "Daily Customers",
    dashCardIcon: <FaDollarSign className="w3-large" />,
    color: "w3-text-red",
  },
  {
    backgroundColor: "#2b236c",
    bigNumber: "98%",
    smallNumber: "-2%",
    cardLabel: "Annual Inflow",
    dashCardIcon: <FaChartArea className="w3-large" />,
    color: "w3-text-red",
  },
];
