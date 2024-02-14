import {Schema, model} from 'mongoose';

const publicationSchema = new Schema({
    imageSrc: {
        type: Buffer,
        require: true,
        trim: true
    },
    imageName: {
        type: String,
        require: true,
        trim: true
    },
    imageType: {
        type: String,
        require: true,
        trim: true
    },
    title : {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    date: {
        type: String,
        require: true,
        trim: true
    },
    orderId: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    }
}, {
    versionKey : false,
    timestamps: true
});

export default model('Publication', publicationSchema)