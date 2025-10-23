import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        console.log("Successfully connected to MongoDB");
        
    } catch (error) {
        console.error("Failed to connect MongoDB", error)
    };  
};

export default connectMongoDB;