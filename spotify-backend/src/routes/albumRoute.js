//first songRoute.js was created, below everything is similart to that file.

//creating separate route paths for all the functionalities like
//addAlbum, listAlbum & removeAlbum

import express from 'express'
import { addAlbum, listAlbum, removeAlbum } from '../controllers/albumController.js'

//can get the images & audio files uploaded from frontend
import upload from '../middleware/multer.js';

//router: with this router we'll create multiple APIs
const albumRouter = express.Router();

//while adding album DATA we must restrict the user to ADD ONLY ONE SINGLE IMAGE:
//if we upload any image with the field name mentioned as('image'), then the middleware will attach that in request.file property.
albumRouter.post('/add', upload.single('image'), addAlbum);

//final URL is like: http://localhost:4000/api/album/add
// "/api/album" format mentioned in server.js

//creating this API in GET method, listAlbum function is executed in this route.
albumRouter.get('/list', listAlbum);
//final URL is like: http://localhost:4000/api/album/list

//creating this API in GET method, removeAlbum function is executed in this route.
albumRouter.post('/remove', removeAlbum);
//final URL is like: http://localhost:4000/api/album/remove


export default albumRouter;