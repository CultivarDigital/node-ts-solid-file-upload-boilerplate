import express from "express";
import cors from "cors";
import { uploadRouter } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/upload", uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Upload Files listening at ${PORT}`));

export default app;
