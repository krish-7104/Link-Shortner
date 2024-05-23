import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email already exists!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    verified: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String,
    }
})


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


export default mongoose.model("user", UserSchema)