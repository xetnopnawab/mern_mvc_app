import express from "express";
const router = express.Router();
import handleGenerateNewShortnerURL from "../controllers/url.controller.js"
 

router.post("/", handleGenerateNewShortnerURL);

export default router;
