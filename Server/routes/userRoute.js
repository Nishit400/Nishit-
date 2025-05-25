import express from 'express';

import { getUserProfileController, logincontroller, registerController } from '../controller/userController.js';

const router = express.Router();

router.post("/register",registerController)

router.post("/login", logincontroller)

router.get("/profile", getUserProfileController)


export default router;
