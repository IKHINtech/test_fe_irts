import mongoose from "mongoose";
mongoose.set('strictQuery', true);

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,

        })
        console.log(`MongoDB Connected: ${connection.connection.host}`.cyan.underline)

    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)

    }
}

export default connectDatabase
