const express = require('express');
const { createUser,checkAuth, loginUser } = require('../controller/Auth');
const router=express.Router();
router.post('/login', loginUser)
router.post('/signup',createUser)
router.get('/check',checkAuth)


exports.router=router;