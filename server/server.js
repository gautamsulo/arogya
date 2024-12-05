import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js"
const app = express();
connectDb();

app.get("/", (req, res) => res.send("<h1>Welcome to the Server</h1>"));
app.use(express.json());

app.use(cors());
app.use(authRouter);

app.listen(8080, () => console.log("Server is connected"));
