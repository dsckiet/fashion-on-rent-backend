const multer = require("multer");
import path from 'path';
import CustomErrorHandler from '../services/CustomErrorHandler';

const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null, 'uploads/',),
    filename:(req , file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const handleMultipartData = multer({storage , limits: {
    fileSize: 1000000*5 //5mb
}}).array('image',4);

const productController = {
    async store(req,res,next){
        //Multipart form data
        handleMultipartData(req, res, (err) =>{
        if(err){
            return next(CustomErrorHandler.serverError("Only 4 photos required"));
        }
        console.log(req.files);
        res.json({});
        //const filePath = req.file.path;
        });        
    }
    
}

export default productController;