import User from "../models/user.model.js"

export const RegisterHandler = async (req, res) => {
    try {
        const user = await User.create(req.body)
        console.log(user)
    } catch (error) {

    }
}

export const LoginHandler = async () => {
    try {

    } catch (error) {

    }
}