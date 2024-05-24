import express from "express"
import { ForgetPasswordHandler, GetUserHandler, LoginHandler, RegisterHandler, UpdatePasswordHandler } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/login", LoginHandler)
router.post("/register", RegisterHandler)
router.post("/forget-password", ForgetPasswordHandler)
router.post("/verify-token/:id", UpdatePasswordHandler)
router.post("/get-user", GetUserHandler)

export default router