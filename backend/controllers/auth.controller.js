import User from "../models/user.model.js"
import { sendMail } from "../utils/mail.js"
import jwt from "jsonwebtoken"
import ApiResponse from "../utils/ApiResponse.js"

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export const RegisterHandler = async (req, res) => {
    try {
        const user = await User.create(req.body)
        const token = generateToken(user)
        res.cookie('token', token, { httpOnly: true })
        res.status(201).json(new ApiResponse(201, user, "User registered successfully"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message))
    }
}

export const LoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !await user.isPasswordCorrect(password)) {
            return res.status(401).json(new ApiResponse(401, null, "Invalid credentials"))
        }
        const token = generateToken(user)
        res.cookie('token', token, { httpOnly: true })
        const data = { _id: user._id, email: user.email }
        res.status(200).json(new ApiResponse(200, user, "Login successful"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message))
    }
}

export const GetUserHandler = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json(new ApiResponse(401, null, "Unauthorized"))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        res.status(200).json(new ApiResponse(200, user, "User retrieved successfully"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message))
    }
}

export const ForgetPasswordHandler = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, "User not found"))
        }
        const token = generateToken(user)
        user.resetToken = token
        await user.save()
        await sendMail(email, "Password Reset", `Your reset token: ${token}`)
        res.status(200).json(new ApiResponse(200, null, "Password reset email sent"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message))
    }
}

export const UpdatePasswordHandler = async (req, res) => {
    try {
        const { token, newPassword } = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user || user.resetToken !== token) {
            return res.status(404).json(new ApiResponse(404, null, "Invalid token or user not found"))
        }
        user.password = newPassword
        user.resetToken = null
        await user.save()
        res.status(200).json(new ApiResponse(200, user, "Password updated successfully"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message))
    }
}
