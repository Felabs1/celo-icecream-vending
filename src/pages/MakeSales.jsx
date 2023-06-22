import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contract } from "../assets/celoFrontEnd";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import Modal from "../components/Modal";

const MakeSales = () => {
  const [contractData, setContractData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const customerName = useRef();
  const quantity = useRef();
  const handleCalculation = (e) => {
    const price = e.target.value;
    setTotal(price * currentId.price);
  };
  async function getAddedDetails() {
    const count = await contract.methods.stockCount().call();
    const productPromises = [];

    for (let i = 1; i <= count; i++) {
      await contract.methods
        .iceCreamsToSell(i)
        .call()
        .then(({ disabled, flavor, price, volume }) => {
          !disabled &&
            productPromises.push({ id: i, disabled, flavor, price, volume });
        });
    }

    const icecreams = await Promise.all(productPromises);

    setContractData(icecreams);
  }
  useEffect(() => {
    getAddedDetails();
  }, []);

  useEffect(() => {
    const filtered = contractData.filter(({ flavor }) =>
      flavor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [contractData, searchTerm]);

  const sellIceCream = async (e) => {
    const enteredName = customerName.current.value;
    const enteredQuantity = quantity.current.value;
    if (enteredName == "" || enteredQuantity == "") {
      toast.error("please fill in all the details!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    console.log(enteredQuantity);

    const address = window.celo.selectedAddress;
    async function makeSales() {
      await contract.methods
        .sellIcecream(
          currentId.id,
          enteredQuantity,
          enteredName,
          currentId.price,
          total
        )
        .send({ from: address, gasLimit: "1000000" })
        .then((data) => {
          console.log(data);
          getAddedDetails();
        });
    }

    const res = await toast.promise(makeSales(), {
      position: toast.POSITION.TOP_CENTER,

      pending: {
        render() {
          return "selling...";
        },
      },
      success: {
        render() {
          quantity.current.value = "";
          customerName.current.value = "";
          return "sold";
        },
      },
      error: {
        render({ data }) {
          const error = data.message;
          if (error.includes("denied")) {
            return "You denied transaction";
          } else if (error.includes("payload")) {
            return "there is an error with payload";
          } else if (error.includes("stock")) {
            return "This flavor is out of stock";
          } else {
            return "some error occured";
          }
        },
      },
    });
  };

  const handleSearchProduct = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <SideNav />
      <Main>
        <Navbar pageName="Make Sales" onSearchProduct={handleSearchProduct} />
        <ToastContainer />
        {modalOpen && (
          <Modal className="w3-text-white">
            <button
              className="w3-right w3-button w3-border"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              &times;
            </button>
            <h4>Add Volume</h4>
            <div>
              <table className="w3-table">
                <tr>
                  <td>Unit Price</td>
                  <td>{currentId.price}</td>
                </tr>
                <tr>
                  <td>flavor</td>
                  <td>{currentId.flavor}</td>
                </tr>
                <tr>
                  <td>Volume</td>
                  <td>{currentId.volume}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>{total.toLocaleString()}</td>
                </tr>
              </table>
              <br />
              {/* <span></span>
              <br />
              <span>Flavor - {currentId.flavor}</span>
              <br />
              <span>Mass remaining - {currentId.volume} kg</span>
              <br /> */}
            </div>
            <label htmlFor="">Customer Name</label>
            <input
              type="text"
              style={{
                backgroundColor: "inherit",
                outline: "none",
                border: "1px solid #999",
                color: "#ccc",
                marginBottom: "5px",
              }}
              ref={customerName}
              className="w3-input w3-round"
            />
            <label htmlFor="">quantity</label>
            <input
              type="number"
              onChange={handleCalculation}
              min="0"
              ref={quantity}
              max={currentId.volume}
              style={{
                backgroundColor: "inherit",
                outline: "none",
                border: "1px solid #999",
                color: "#ccc",
                marginBottom: "5px",
              }}
              className="w3-input w3-round"
            />
            <button
              className="w3-button w3-blue w3-round"
              onClick={sellIceCream}
            >
              Proceed...
            </button>
          </Modal>
        )}
        <br />
        <div className="w3-padding">
          <table className="w3-table w3-text-white">
            <caption className="w3-large">Added in stock</caption>
            <thead>
              <tr>
                <th>Flavour</th>
                <th>Price</th>
                <th>Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map(
                  ({ disabled, flavor, price, volume, id }, index) => {
                    return (
                      <tr key={index}>
                        <td>{flavor}</td>
                        <td>{price}</td>
                        <td>{volume}</td>
                        <td>
                          <button
                            className="w3-btn w3-round"
                            style={{ backgroundColor: "#171d69" }}
                            onClick={() => {
                              setModalOpen(true);
                              setCurrentId((previousState) => {
                                return {
                                  ...previousState,
                                  id,
                                  flavor,
                                  price,
                                  volume,
                                };
                              });
                            }}
                          >
                            sell
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      </Main>
    </>
  );
};

export default MakeSales;
