import {Schema, model} from 'mongoose';

const publicationSchema = new Schema({
    src: {
        type: Object,
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
        type: Date,
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