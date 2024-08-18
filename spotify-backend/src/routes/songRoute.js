

import { addSong, listSong, removeSong } from '../controllers/songController.js'
import express from 'express'
import upload from '../middleware/multer.js';

//router: with this router we'll create multiple APIs
const songRouter = express.Router();

//creating this API in POST method
//Uploading fields with its label/name value & only one file at a time is allowed is mentioned as maxCount.
songRouter.post('/add', upload.fields([{name:'image', maxCount:1},{name:'audio', maxCount:1}]) ,addSong); //addSong func. is called

//creating this API in GET method
songRouter.get('/list', listSong);


songRouter.post('/remove', removeSong);

export default songRouter;