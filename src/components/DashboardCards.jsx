import { useState, useEffect } from "react";

import {
  FaBaseballBall,
  FaChartArea,
  FaPlus,
  FaCartPlus,
  FaChartPie,
  FaDollarSign,
} from "react-icons/fa";
import { dashCards } from "../assets/appData";
import { contract } from "../assets/celoFrontEnd";

const DashboardCards = () => {
  const [dashBoardCards, setDashCards] = useState(null);
  const [contractData, setContractData] = useState(null);
  async function getSoldIcecreams() {
    const count = await contract.methods.saleCount().call();
    const DAY = 90440;
    const CURRENT_DATE = new Date();
    const CURRENT_TIMESTAMP = CURRENT_DATE.getTime() / 1000;
    const WHERE_ANALYSIS_STARTS = CURRENT_TIMESTAMP - DAY;
    const YEAR = DAY * 365.25;
    const WHERE_YEARLY_ANALYSIS_STARTS = CURRENT_TIMESTAMP - YEAR;
    const LAST_YEAR_ANALYSIS_START = WHERE_ANALYSIS_STARTS - YEAR;
    const productPromises = [];

    let todaySales = 0,
      yesterDaysSales = 0,
      numberOfCustomers = 0,
      numberOfYesterDayCustomers = 0,
      thisYearSales = 0,
      lastYearSales = 0;

    for (let i = 1; i <= count; i++) {
      await contract.methods
        .sales(i)
        .call()
        .then(({ customerName, flavor, quantity, price, total, timestamp }) => {
          productPromises.push({
            customerName,
            flavor,
            price,
            quantity,
            total,
            timestamp,
          });
        });
    }

    const icecreams = await Promise.all(productPromises);
    console.log(icecreams);
    for (let { timestamp, total } of icecreams) {
      if (timestamp > WHERE_ANALYSIS_STARTS && timestamp < CURRENT_TIMESTAMP) {
        todaySales += Number(total);
        numberOfCustomers++;
      }

      if (
        timestamp > WHERE_YEARLY_ANALYSIS_STARTS &&
        timestamp < CURRENT_TIMESTAMP
      ) {
        thisYearSales += Number(total);
      }

      if (
        timestamp > LAST_YEAR_ANALYSIS_START &&
        timestamp < WHERE_YEARLY_ANALYSIS_STARTS
      ) {
        lastYearSales += Number(total);
      }

      if (
        timestamp > WHERE_ANALYSIS_STARTS - DAY &&
        timestamp < WHERE_ANALYSIS_STARTS
      ) {
        yesterDaysSales += Number(total);
        numberOfYesterDayCustomers++;
      }
    }

    const dailyGain = (todaySales * 100) / (yesterDaysSales + 1) - 100;
    console.log(dailyGain);
    const dailyCustomerGain =
      (numberOfCustomers * 100) / (numberOfYesterDayCustomers + 1) - 100;
    const annualGain = (thisYearSales * 100) / (lastYearSales + 1) - 100;

    const dashCards = [
      {
        backgroundColor: "#0f2274",
        bigNumber: todaySales.toLocaleString(),
        smallNumber: `${dailyGain > 0 ? "+" : ""}${
          dailyGain > 100 ? 99 : dailyGain.toFixed(2)
        }%`,
        cardLabel: "Daily Sales",
        dashCardIcon: <FaChartPie className="w3-large" />,
        color: `${dailyGain > 0 ? "w3-text-green" : "w3-text-red"}`,
      },
      {
        backgroundColor: "#171d69",
        bigNumber: numberOfCustomers,
        smallNumber: `${dailyCustomerGain > 0 ? "+" : ""}${
          dailyCustomerGain > 100 ? 99 : dailyCustomerGain.toFixed(2)
        }%`,
        cardLabel: "Daily Customers",
        dashCardIcon: <FaDollarSign className="w3-large" />,
        color: `${dailyCustomerGain > 0 ? "w3-text-green" : "w3-text-red"}`,
      },
      {
        backgroundColor: "#2b236c",
        bigNumber: thisYearSales.toLocaleString(2),
        smallNumber: `${annualGain > 0 ? "+" : ""}${
          annualGain > 100 ? 99 : annualGain.toFixed(2)
        }%`,
        cardLabel: "Annual Inflow",
        dashCardIcon: <FaChartArea className="w3-large" />,
        color: `${annualGain > 0 ? "w3-text-green" : "w3-text-red"}`,
      },
    ];

    console.log(icecreams);
    console.log(todaySales, yesterDaysSales);
    console.log(numberOfCustomers, numberOfYesterDayCustomers);
    console.log(thisYearSales, lastYearSales);
    const dbCards = await Promise.all(dashCards);
    setDashCards(dbCards);
    console.log(dashCards);

    setContractData(icecreams);
  }

  console.log(dashBoardCards);

  useEffect(() => {
    getSoldIcecreams();
  }, []);

  return (
    <div className="w3-row-padding">
      {dashBoardCards &&
        dashBoardCards.map(
          (
            {
              backgroundColor,
              bigNumber,
              smallNumber,
              cardLabel,
              dashCardIcon,
              color,
            },
            index
          ) => {
            return (
              <div className="w3-col l3 w3-text-white" key={index}>
                <div
                  className="w3-round-xlarge"
                  style={{ backgroundColor: backgroundColor, height: "300px" }}
                >
                  <br />
                  <div style={{ margin: "23px" }}>
                    <br />
                    <span
                      className="w3-text-white w3-tag w3-round-xxlarge w3-padding"
                      style={{
                        backgroundColor: "#39519b",
                      }}
                    >
                      {dashCardIcon}
                    </span>
                    <br />
                    <br />
                    <span className="w3-xlarge">{bigNumber}</span>&nbsp;&nbsp;
                    <span className={`w3-small w3-text-green ${color}`}>
                      {smallNumber}
                    </span>
                    <br />
                    <h4>{cardLabel}</h4>
                  </div>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default DashboardCards;
