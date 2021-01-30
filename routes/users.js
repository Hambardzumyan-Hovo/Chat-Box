import express from "express";
import { addUser, loginUser, addProfilePic } from "../controllers/usersController.js";
// import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/addUser", addUser);
router.post("/loginUser", loginUser);
router.post("/addProfilePic", addProfilePic);
//upload.single("profilePic"),
export default router;
