const multer = require('multer');
const storage = multer.memoryStorage();

// filter files by their extensions 
const fileFilter = (req,file,cb) =>
{
    if(file.mimetype.split("/")[0] === "image")
    {
        cb(null,true);
    }
    else
    {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false)
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 40000000, files: 1 }});

module.exports = {upload};