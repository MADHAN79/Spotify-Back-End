import mongoose from 'mongoose'

//creating schema for the album
const albumSchema = new mongoose.Schema({

    //required: true means without this name value, it wont allow us to save the album in the database.
    name:     {type:String, required: true} ,
    desc:     {type:String, required: true} ,
    bgColour: {type:String, required: true} , 
    image:    {type:String, required: true} 
})

//creating one model for the album
//first checking is there any album models in our mongoose models || if not we'll create one mongoose model with modelname:album, with its schema.
const albumModel = mongoose.models.album || mongoose.model("album", albumSchema);

export default albumModel;