//API

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';

// <------------------------
    //app config

    //we are storing the instance of our express
    const app = express();

    //Defining our port
    //if port number is not defined in our .env file this OR(||) gives the default port number as 4000
    const port = process.env.PORT || 4000; 

    connectDB();
    connectCloudinary();

// ------------------------>

// <------------------------
    //middlewares

    //adding middlewares in express app
    app.use(express.json()); //whenever we get any requests that will pass through this json method.
    app.use(cors()); //since our frontend & backend runs in different port numbers, cors used to connect them both.

// ------------------------>

    //initializing routes
    app.use("/api/song", songRouter)


        //using app.get method we have created the api and running in localhost('/')
        app.get('/', ( req,res ) => res.send('API Working'))

        //starting our express app
        app.listen(port, () =>console.log(`Server started on ${port}`)) //mentioned above