//creating separate route paths for all the functionalities like
//addSong, listSong & removeSong

import { addSong, listSong, removeSong } from '../controllers/songController.js'
import express from 'express'

//can get the images & audio files uploaded from frontend
import upload from '../middleware/multer.js';

//router: with this router we'll create multiple APIs
const songRouter = express.Router();

//creating this API in POST method
//Uploading fields with its label/name value & only one file at a time is allowed is mentioned as maxCount.
songRouter.post('/add', upload.fields([{name:'image', maxCount:1},{name:'audio', maxCount:1}]) ,addSong); //addSong func. is called
//final URL is like: http://localhost:4000/api/song/add
// "/api/song" format mentioned in server.js


//creating this API in GET method, listSong function is executed in this route.
songRouter.get('/list', listSong);
//final URL is like: http://localhost:4000/api/song/list


//creating this API in post method, removeSong function is executed in this route.
songRouter.post('/remove', removeSong);
//final URL is like: http://localhost:4000/api/song/remove


export default songRouter;