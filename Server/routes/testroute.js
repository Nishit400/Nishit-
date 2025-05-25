import express from "express";
import { testcontroller } from "../controller/testcontroller.js";

const router = express.Router()

router.get("/test",testcontroller)

export default router;