import express, { Request, Response } from "express";
import dotenv from "dotenv";
import genratemdRoute from "./routes/generatemd.route";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript backend!");
});

app.use("/api", genratemdRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
