import express from "express";
import { addUser, loginUser, addProfilePic } from "../controllers/usersController.js";

const router = express.Router();

router.post("/addUser", addUser);
router.post("/loginUser", loginUser);
router.post("/addProfilePic", addProfilePic);

export default router;
