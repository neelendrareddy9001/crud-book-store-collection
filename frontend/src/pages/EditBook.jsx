import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4500/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
        enqueueSnackbar("Book Edited Successfully", { variant: "success" });
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happend. Please check console ");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:4500/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Chack console");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 title">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-800 rounded-xl w-[600px] p-4 mx-auto">
        <h3 className="title text-2xl font-semibold first-letter:text-yellow-500 first-letter:text-3xl ">
          New Book
        </h3>
        <div className="py-4">
          <label className="text-2xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full input-box"
          />
        </div>
        <div className="py-4">
          <label className="text-2xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full input-box"
          />
        </div>
        <div className="py-4">
          <label className="text-2xl mr-4 text-gray-500">PublishhYear</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full input-box"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 font-medium text-2xl rounded-xl btn"
          onClick={handleEditBook}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditBook;
