import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Mongo URI:", process.env.MONGODB_URI);

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🧠 Connected DB name:", mongoose.connection.name);
console.log("🧠 Connected DB host:", mongoose.connection.host);

  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
