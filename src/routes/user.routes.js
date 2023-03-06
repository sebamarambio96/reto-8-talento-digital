import { Router } from "express";
import { getUserInfo, addUser, login} from "../controllers/user.controllers.js";

const router = Router()

//GET profile
router.get('/profile', getUserInfo)

//Login
router.post('/login', login)

//ADD new user
router.post('/register',addUser)


export default router