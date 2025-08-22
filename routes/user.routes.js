import { Router } from "express";
import { register } from "../controllers/user.controller.js";
// modules //

const router = Router();
// router //

router.route('/register').post(register)
// routes //


export default router;