import React, { useEffect, useState } from "react";
import axios from "axios";

import Spinner from "../components/Spinner";
import BookTable from "../components/home/BookTable";
import BookCard from "../components/home/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4500/books", { method: "POST" })

      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="p-4 bg-lime-300 m-40 rounded-2xl shadow-xl">
        <div className="flex justify-center items-center gap-x-4">
          <button
            className="bg-sky-300 hover:bg-sky-600 p-8 py-1 font-semibold my-4 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className="bg-sky-300 hover:bg-sky-600 p-8 font-semibold py-1 my-4 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <BookTable books={books} />
        ) : (
          <BookCard books={books} />
        )}
      </div>
    </>
  );
};

export default Home;
