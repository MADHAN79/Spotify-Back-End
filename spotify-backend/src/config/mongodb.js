import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("connnection established");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/spotify`);

}

export default connectDB;