import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import { connectToDB } from "./database/db.js"
import authRoute from "./routes/auth.route.js"

config()
connectToDB()
const PORT = process.env.PORT || 5000
const app = express()


app.use(cookieParser())
app.use(cors({ origin: [process.env.FRONTEND_LINK] }))

app.use("/api/v1/auth", authRoute)

app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`)
})

