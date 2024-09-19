import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    slug:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    category:{
        type:mongoose.objectID,
        ref: 'category',
        required: true
    }, quantity:{
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

export default mongoose.model('products', productSchema);
