import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import genratemdRoute from "./routes/generatemd.route";
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript backend!");
});

app.use("/api", genratemdRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
