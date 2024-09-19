import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    slug:{
        type:String,
        lowercase: true,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    photo:{
        type: ArrayBuffer,
        contentType:String,
    },
    shipping:{
        type: Boolean
    },
}, {timeStamps: true} );

export default mongoose.model('category', categorySchema);
