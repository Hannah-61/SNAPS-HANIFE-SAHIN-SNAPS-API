import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import photosRoutes from "./routes/photos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


app.use("/images", express.static("./public/images"));

app.use("/photos", photosRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Error! Click on Ctrl + c to stop the server`);
});
