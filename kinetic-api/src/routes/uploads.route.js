import upload from "#controllers/uploads.controller.js";
import express from "express";


const uploadRouter = express.Router();

uploadRouter.post('/', upload)

export default uploadRouter;