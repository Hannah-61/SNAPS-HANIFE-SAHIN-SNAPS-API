import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import tags from "./routes/tags.js";
import photos from "./routes/photos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());


app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/tags", tags);
app.use("/photos", photos);

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
