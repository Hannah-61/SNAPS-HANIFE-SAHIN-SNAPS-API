import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/', (req, res) => {
  const tagsData = fs.readFileSync('./data/tags.json');
  const tags = JSON.parse(tagsData);
  res.json(tags);
});

export default router;

