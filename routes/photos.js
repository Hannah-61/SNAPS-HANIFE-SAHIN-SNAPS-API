import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photosDataPath = path.join(__dirname, "../Data/photos.json");
let photos = JSON.parse(fs.readFileSync(photosDataPath, "utf-8"));


router.get("/", (req, res) => {
    const photosWithFullPath = photos.map(photo => ({
        ...photo,
        photo: `${process.env.FRONTEND_URL}/images/${photo.photo}`
    }));
    res.json(photosWithFullPath);
});


router.get("/:id", (req, res) => {
    const photo = photos.find(p => p.id === req.params.id);
    if (!photo) {
        return res.status(404).json({ error: "Photo not found" });
    }
    photo.photo = `${process.env.FRONTEND_URL}/images/${photo.photo}`;
    res.json(photo);
});

export default router;
