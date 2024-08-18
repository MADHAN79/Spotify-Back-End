//using these func. we'll create addSong & listSong & removeSong API
//basically logic behind the song APIs.

//for uploading these files in the cloudinary storage.
import {v2 as cloudinary} from 'cloudinary'

import songModel from '../models/songModel.js'

const addSong = async (req,res) => {
    try {
        //extracting all the data from the API CALL & why are we importing all these ?
        //becoz this below schema is mentioned in songModel.js
        const name = req.body.name;  
        const desc = req.body.desc;
        const album = req.body.album;

        //below values coming from songRouter.js
        const imageFile = req.files.image[0];
        const audioFile = req.files.audio[0];

        //for uploading these files in the cloudinary storage.
        //while uploading the audio file it will generate one response, this res will get assigned in this const variable.
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'});
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type:'video'});

        // "/60" - gives minute of audio  || "%60" - gives second of audio
        const duration =   `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`

        //this structure is based on schema that we have created in songModel.js
        //creating the songData - collecting the data from above lines & formating the songData structure
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        //saving the above songData in our database
        const song = songModel(songData);
        await song.save();
        //generating one response with json method for songData is successfully saved in our database.
        res.json({success:true, message:"Song added"});

    } catch (error) {
        res.json({ success:false });
    }
}

const listSong = async (req,res) => {
    try {
        //we are leaving the "filter-object({})" empty so that we can get all the data from songModel
        const allSongs = await songModel.find({}); 
        res.json({success:true, songs:allSongs});
        
    } catch (error) {
        res.json({ success:false });   
    }
}

const removeSong = async (req,res) => {
    try {

        //only if you know all these types of methods like .find, .findByIdAndDelete you can work on backend.
        await songModel.findByIdAndDelete(req.body.id); //delete the song based on id
        res.json({success:true, message:"Song removed"});
        
    } catch (error) {
        res.json({ success:false });   
    }
}

//Exporting all these func. to songRoute.js
export { addSong, listSong, removeSong }