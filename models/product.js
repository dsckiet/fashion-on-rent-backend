import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    owner_id: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    name :{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    sizes:{
        type: Number,       
        required: true
    },
    price:{
        type: String,
        required: true
    },
    images:{
        type: String,
        required: true
    },
    Style_tip:{
        type: String,
    },
    Address:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    Landmark:{
        type: String,
    },
    State:{
        type: String,
        required: true
    },
    Pincode: {
        type: String,
        required: true
    }

},{timestamps: true})

export default mongoose.model('Product',productSchema,'products');