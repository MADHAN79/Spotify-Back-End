import mongoose from "mongoose";

//creating schema for the song
const songSchema = new mongoose.Schema({

    //required: true means without this name value, it wont allow us to save the song in the database.
    name:     {type:String, required: true} ,
    desc:     {type:String, required: true} ,
    album:    {type:String, required: true} , //mentions the song's album.
    image:    {type:String, required: true} ,
    file:     {type:String, required: true} , //enters the URL of the song.
    duration: {type:String, required: true} 
})


//creating one model for the song
//first checking is there any song models in our mongoose models || if not we'll create one mongoose model with modelname:song, with its schema.
const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;