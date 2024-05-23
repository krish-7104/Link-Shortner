import mongoose from "mongoose"

export const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB)
        console.log(`MongoDb Connected! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
    }
}