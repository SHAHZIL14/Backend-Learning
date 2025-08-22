import multer from "multer";
import fs from 'fs';
// Modules //

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '. /public/temp');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
// Configuration //

export const upload = multer({ storage: storage });
// Method || Middleware //