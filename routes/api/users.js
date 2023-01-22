const express = require("express");
const { signup, login, logout, current } = require("../../controllers");

const authRouter = express.Router();