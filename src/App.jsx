import React, { Component, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import AddVariety from "./pages/AddVariety";
import Dashboard from "./pages/Dashboard";
import EditStock from "./pages/EditStock";
import Login from "./pages/Login";
import MakeSales from "./pages/MakeSales";
import ProtectedRoute from "./ProtectedRoute";

function App() {
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
