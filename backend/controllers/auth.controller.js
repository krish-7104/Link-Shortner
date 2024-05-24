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
        res.cookie('token', token, { httpOnly: false })
        const data = { _id: user._id, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt }
        res.status(200).json(new ApiResponse(200, data, "Login successful"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message))
    }
}

export const GetUserHandler = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json(new ApiResponse(401, null, "Unauthorized: Missing or invalid token"));
        }
        const token = authorizationHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json(new ApiResponse(404, null, "User not found"));
            }
            return res.status(200).json(new ApiResponse(200, user, "User retrieved successfully"));
        } catch (err) {
            console.error("Error decoding token:", err.message);
            return res.status(401).json(new ApiResponse(401, null, "Unauthorized: Invalid token"));
        }
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
};


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
