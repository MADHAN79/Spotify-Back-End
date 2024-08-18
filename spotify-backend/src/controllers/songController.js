//using these func. we'll create addSong & listSong API
//basically logic behind the APIs.

//for uploading these files in the cloudinary storage.
import {v2 as cloudinary} from 'cloudinary'

import songModel from '../models/songModel.js'

const addSong = async (req,res) => {
    try {
        //extracting all the data from the API CALL
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;

        //below values coming from songRouter.js
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        //for uploading these files in the cloudinary storage.
        //while uploading the audio file it will generate one response, this res will get assigned in this const variable.
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type:'video'});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'});

        // "/60" - gives minute of audio  || "%60" - gives second of audio
        const duration =   `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`

        //this structure is based on schema that we have created in songModel.js
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

}

export { addSong, listSong }