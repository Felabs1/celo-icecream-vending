import { Component, useReducer, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import AddVariety from "./pages/AddVariety";
import Dashboard from "./pages/Dashboard";
import EditStock from "./pages/EditStock";
import Login from "./pages/Login";
import MakeSales from "./pages/MakeSales";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.celo !== "undefined") {
      window.celo.on("accountsChanged", handleAccountsChanged);
      window.celo.on("disconnect", handleDisconnect);
      window.celo.on("connect", handleConnect);
    }

    return () => {
      window.celo.off("accountsChanged", handleAccountsChanged);
      window.celo.off("disconnect", handleDisconnect);
      window.celo.off("connect", handleConnect);
    };
  }, []);
  function handleConnect() {
    navigate("/");
  }
  function handleAccountsChanged(accounts) {
    if (accounts.length > 0) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  function handleDisconnect() {
    navigate("/login");
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/make-sales"
          element={
            <ProtectedRoute>
              <MakeSales />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/add-variety"
          element={
            <ProtectedRoute>
              <AddVariety />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}
export default App;
