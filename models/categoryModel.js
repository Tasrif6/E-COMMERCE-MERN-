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
}, {timeStamps: true} );

export default mongoose.model('category', categorySchema);
