import crypto from "crypto";
import fs from "fs";
import express from "express";

// ✅ Use fs.readFileSync() to load JSON data
const photos = JSON.parse(fs.readFileSync("./Data/photos.json", "utf8"));

const router = express.Router();

// ✅ Route to get all photos
router.get("/", function (request, response) {
    response.json(photos);
});

// ✅ Route to get a specific photo by ID
router.get("/:id", function (request, response) {
    const photo = photos.find((e) => e.id === request.params.id);
    if (!photo) {
        return response.status(404).send("Photo not found");
    }
    response.json(photo);
});

// ✅ Route to get comments for a specific photo
router.get("/:id/comments", function (request, response) {
    const photo = photos.find((e) => e.id === request.params.id);
    if (!photo) {
        return response.status(404).send("Photo not found");
    }
    response.json(photo.comments);
});

// ✅ Route to add a new comment to a photo
router.post("/:id/comments", function (request, response) {
    const photo = photos.find((e) => e.id === request.params.id);
    if (!photo) {
        return response.status(404).send("Photo not found");
    }
    
    const newComment = {
        id: crypto.randomUUID(),
        name: request.body.name,
        comment: request.body.comment,
        timestamp: new Date().getTime(),
    };
    
    photo.comments.push(newComment);
    const photoIndex = photos.findIndex((e) => e.id === request.params.id);
    photos[photoIndex] = photo;
    
    fs.writeFile("./Data/photos.json", JSON.stringify(photos, null, 2), "utf8", (err) => {
        if (err) {
            console.log("Failed to save comment:", err);
            return response.status(500).send("Failed to save comment");
        }
    });

    response.json(newComment);
});

export default router;
