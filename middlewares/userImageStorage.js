const multer = require('multer')
const path = require('path')

const imageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "..", "/uploads/userImage"));
    },
    filename: (req, file, callback) => {
        var ext = file.originalname.substring(file.originalname.indexOf("."));
        callback(null, `image_${Date.now()}.${file.originalname}`);
    }
})

// const isImage = (req, file, callback) => {
//     if(file.mimetype.startsWith("image")){
//         callback(null, true)
//     }
//     else {
//         callback(new Error("only images is allowed"));
//     }
// }

const upload = multer({
    storage: imageConfig,
    // fileFilter : isImage,
})

module.exports = {
    upload
}
