const multer = require("multer");
import path from 'path';
import { Product } from '../models';
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
         handleMultipartData(req, res, async(err) =>{
        if(err){
            return next(CustomErrorHandler.serverError("Only 4 photos required"));
        }
        const file = req.files;
        const imageLink = file.map((ele)=>{
            return ele.path;
        })
        //console.log(imageLink);
        const {userId} = req.user;
        const {type,name,description,sizes,price,Style_tip,Address,City,Landmark,State,Pincode} = req.body;
        const product = new Product({
            owner_id:userId,
            type,
            name,
            description,
            sizes,
            price,
            images: JSON.stringify(imageLink),
            Style_tip,
            Address,
            City,
            Landmark,
            State,
            Pincode
        })
        try{
            const result = await product.save();
            res.status(201).json({response: "Added Successfully"});
        }catch(err){
            return next(err);
        }

        
        //const filePath = req.file.path;
        });        

        
    }
    
}

export default productController;