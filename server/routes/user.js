import express from 'express';
const router = express.Router();
import { findUser, viewUsers, addUserPage, addUser, editUserPage, editUser, deleteUser, viewUserPage } from '../controllers/user_controller.js'



router.get('/', viewUsers)
router.post('/', findUser)
router.get('/adduser', addUserPage)
router.post('/adduser', addUser)
router.get('/edituser/:id', editUserPage)
router.post('/edituser/:id', editUser)
router.get('/viewuser/:id', viewUserPage)
router.get('/:id', deleteUser)


export default router;