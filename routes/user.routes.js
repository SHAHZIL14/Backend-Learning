import { Router } from "express";
import { register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
// modules //

const router = Router();
// router //

router.route('/register').post(
  upload.single("profile")
  , register
)
// routes //


export default router;