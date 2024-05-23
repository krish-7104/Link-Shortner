import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email already exists!"],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: 6,
    },
    resetToken: {
        type: String,
    },
}, { timestamps: true })

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export default mongoose.model("User", UserSchema)
