import { useRef, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import { web3, contract, kit } from "../assets/celoFrontEnd";
import SideNav from "../components/SideNav";
import Modal from "../components/Modal";

const AddVariety = () => {
  const [contractData, setContractData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const volume = useRef();
  const flavour = useRef();
  const pricePerLitre = useRef();
  const volumeToUpdate = useRef();
  const priceToUpdate = useRef();

  async function getAddedDetails() {
    const count = await contract.methods.stockCount().call();
    const productPromises = [];

    for (let i = 1; i <= count; i++) {
      await contract.methods
        .iceCreamsToSell(i)
        .call()
        .then(({ disabled, flavor, price, volume }) => {
          disabled == false &&
            productPromises.push({ id: i, disabled, flavor, price, volume });
        });
    }

    const icecreams = await Promise.all(productPromises);

    setContractData(icecreams);
  }
  useEffect(() => {
    getAddedDetails();
  }, []);
  console.log(contractData);

  const handleDelete = async (e) => {
    console.log(e.target.value);
    async function contractInteraction() {
      await contract.methods
        .deleteIcecream(e.target.value)
        .send({ from: window.celo.selectedAddress, gasLimit: "1000000" })
        .then((data) => {
          getAddedDetails();
        });
    }
    const res = await toast.promise(contractInteraction(), {
      position: toast.POSITION.TOP_CENTER,

      pending: "Deleting",
      success: "Deleted",
      error: "Failed to delete",
    });
  };
  const handleSearch = (e) => {
    const text = e.target.value;
    let filteredData = contractData.filter((data) => {
      return data.flavor.toLowerCase().includes(text);
    });
    console.log(filteredData);
    setContractData(filteredData);
  };
  const handleAddIcecream = async (e) => {
    e.preventDefault();
    const enteredVolume = volume.current.value;
    const enteredFlavour = flavour.current.value;
    const enteredPricePerLitre = pricePerLitre.current.value;
    const accounts = await kit.web3.eth.getAccounts();
    const sender = accounts[0];
    console.log(sender);

    if (
      enteredVolume == "" ||
      enteredFlavour == "" ||
      enteredPricePerLitre == ""
    ) {
      toast.error("please fill in all the details!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const addIcecream = async () => {
      await contract.methods
        .addStock(enteredFlavour, enteredVolume, enteredPricePerLitre)
        .send({ from: sender, gasLimit: "1000000" })
        .then((data) => {
          getAddedDetails();
        });
    };

    const res = await toast.promise(addIcecream(), {
      position: toast.POSITION.TOP_CENTER,

      pending: "Adding",
      success: "Added",
      error: "some error occured",
    });
  };

  const updateVolume = async () => {
    if (volumeToUpdate.current.value == "") {
      toast.error("please enter the volume to update!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    async function contractInteraction() {
      await contract.methods
        .refillIceCream(currentId, volumeToUpdate.current.value)
        .send({
          from: window.celo.selectedAddress,
          gasLimit: "1000000",
        })
        .then((data) => {
          getAddedDetails();
          volumeToUpdate.current.value = "";
        });
    }

    const res = await toast.promise(contractInteraction(), {
      position: toast.POSITION.TOP_CENTER,

      pending: "saving...",
      success: "Successfully saved",
      error: "some error occured",
    });
  };

  const updatePricing = async () => {
    if (priceToUpdate.current.value == "") {
      toast.error("please enter the price to ontinue", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    async function contractInteraction() {
      await contract.methods
        .editPrice(currentId, priceToUpdate.current.value)
        .send({
          from: window.celo.selectedAddress,
          gasLimit: "1000000",
        })
        .then((data) => {
          getAddedDetails();
          priceToUpdate.current.value = "";
        });
    }

    const res = await toast.promise(contractInteraction(), {
      position: toast.POSITION.TOP_CENTER,

      pending: "saving...",
      success: "price updated successfully",
      error: "some error occured",
    });
  };

  return (
    <>
      <SideNav />
      <Main>
        <Navbar pageName="Add Varieties" onSearchProduct={handleSearch} />
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
            <input
              type="number"
              ref={volumeToUpdate}
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
              onClick={updateVolume}
              className="w3-btn w3-border w3-round"
            >
              Update Volume
            </button>
            <br />
            <br />
            <h4>Update Pricing</h4>
            <input
              type="number"
              ref={priceToUpdate}
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
              onClick={updatePricing}
              className="w3-btn w3-border w3-round"
            >
              Update Pricing
            </button>
          </Modal>
        )}
        <br />
        <br />
        <form
          className="w3-padding w3-text-white w3-round-large w3-auto"
          style={{
            backgroundImage: "linear-gradient(to left, #2e50a5, #0f2274 )",
            width: "30rem",
          }}
        >
          <h4>Add Variety</h4>
          <label>Flavour</label>
          <input
            style={{
              backgroundColor: "inherit",
              outline: "none",
              border: "1px solid #999",
              color: "#ccc",
              marginBottom: "5px",
            }}
            ref={flavour}
            className="w3-input w3-round"
          />
          <label>Volume (Litres)</label>
          <input
            ref={volume}
            style={{
              backgroundColor: "inherit",
              outline: "none",
              border: "1px solid #999",
              color: "#ccc",
              marginBottom: "5px",
            }}
            className="w3-input w3-round"
          />
          <label>Price /litre</label>
          <input
            ref={pricePerLitre}
            style={{
              backgroundColor: "inherit",
              outline: "none",
              border: "1px solid #999",
              color: "#ccc",
              marginBottom: "5px",
            }}
            className="w3-input w3-round"
          />
          <br />
          <button
            className="w3-button w3-round w3-right"
            style={{ backgroundColor: "#0f2274" }}
            onClick={handleAddIcecream}
          >
            Save
          </button>
          <ToastContainer />
          <br />
          <br />
        </form>
        <br />
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
              {contractData &&
                contractData.map(({ disabled, flavor, price, volume, id }) => {
                  return (
                    <tr>
                      <td>{flavor}</td>
                      <td>{price}</td>
                      <td>{volume}</td>
                      <td>
                        <button
                          className="w3-btn w3-round"
                          style={{ backgroundColor: "#171d69" }}
                          onClick={() => {
                            setModalOpen(true);
                            setCurrentId(id);
                          }}
                        >
                          Edit
                        </button>
                        &nbsp;
                        <button
                          className="w3-btn w3-round"
                          style={{ backgroundColor: "#936b0e" }}
                          value={id}
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Main>
    </>
  );
};

export default AddVariety;
