import { login, signUp } from "../controller/authController";
import { Router } from "express";
import { authenticateToken } from "../middleware/authentication";
import { redirectURL, shortURL } from "../controller/shortUrl";
const router = Router();

router.post("/signUp", signUp);
router.post("/login", login)
router.post("/shorten",authenticateToken, shortURL)
router.get("/:shortId",authenticateToken, redirectURL);

export default router;
