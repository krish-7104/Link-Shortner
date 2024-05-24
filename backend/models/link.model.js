import mongoose, { Schema } from "mongoose"

const LinkSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is Required"]
    },
    longurl: {
        type: String,
        required: [true, "URL is Required"]
    },
    uniqueId: {
        type: String,
        required: [true, "uniqueId is Required"],
        trim: true,
        lowercase: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is Required"]
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


export default mongoose.model('link', LinkSchema)