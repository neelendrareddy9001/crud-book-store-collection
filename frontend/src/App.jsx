import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ShowBooks from "./pages/ShowBooks";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBooks />} />
        <Route path="books/edit/:id" element={<EditBook />} />
        <Route path="books/delete/:id" element={<DeleteBook />} />
      </Routes>
    </>
  );
}

export default App;