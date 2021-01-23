import express from "express";
import cors from "cors";
import { uploadRouter } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/upload", uploadRouter);

app.listen(3000, () => console.log("listening on 3000"));

export default app;
