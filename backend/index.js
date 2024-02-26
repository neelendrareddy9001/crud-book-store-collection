import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

//Middleware for handling CORS POLICY
//Option 1: Allow All origins with Default of cors(*)
// app.use(
//   cors({
//     origin: "http://localhost:5173/books/",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to Mern Stack Tutorial");
});

app.use("/books", bookRoutes);

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
