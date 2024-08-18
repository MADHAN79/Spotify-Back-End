//using these func. we'll create addAlbum & listAlbum & removeAlbum API
//basically logic behind the Album APIs.

//for uploading these files in the cloudinary storage.
import {v2 as cloudinary} from 'cloudinary'

import albumModel from '../models/albumModel.js'


const addAlbum = async (req, res) =>{
    try {
        //extracting all the data from the API CALL & why are we importing all these ?
        //becoz this below schema is mentioned in albumModel.js
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColour = req.body.bgColour;
        const imageFile = req.file;

        //to upload the image in our cloudinary storage | & by using await we can get a response back and that is stored in the variable.
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});

        //creating the albumData - collecting the data from above lines & formating the albumData structure
        const albumData = {
            name,
            desc,
            bgColour,
            //providing the image that is uploaded in the cloudinary
            image: imageUpload.secure_url
        }

        //saving the above albumData in our database
        const album = albumModel(albumData);
        await album.save();
        //generating one response with json method for albumData is successfully saved in our database.
        res.json({success:true, message:"Album added"});

    } catch (error) {
        res.json({ success:false });
    }
}



const listAlbum = async (req, res) =>{
    try {
        //we are leaving the "filter-object({})" empty so that we can get all the data from albumModel
        const allAlbums = await albumModel.find({}); 
        res.json({success:true, albums:allAlbums});
        
    } catch (error) {
        res.json({ success:false });   
    }
}



const removeAlbum = async (req, res) =>{
    try {
        //id is assigned by mongodb
        await albumModel.findByIdAndDelete(req.body.id); //delete the album based on id
        res.json({success:true, message:"Album removed"});
        
    } catch (error) {
        res.json({ success:false });   
    }
}

export { addAlbum, listAlbum, removeAlbum }