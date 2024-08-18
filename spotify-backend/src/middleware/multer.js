//we'll get the images & audio files uploaded from frontend with this multer package

import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer({storage});

export default upload;