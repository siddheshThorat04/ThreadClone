import express from "express"
import {followUnfollowUser, getUserProfile, login, logout, signUp, updateUser} from "../controllers/userController.js"
import protectRoute from "../middlewares/protectRoute.js"
const router =express.Router()

router.get("/profile/:username",getUserProfile)
router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logout)

router.post("/follow/:id",protectRoute,followUnfollowUser)
router.put("/update/:id",protectRoute,updateUser)

export default router
