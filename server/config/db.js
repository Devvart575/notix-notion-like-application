import mongoose from "mongoose";

const connectDB = async () =>{
    try{
       await mongoose.connect(process.env.MONGO_URI) 
       console.log("Server is connected to the database ");
                         
    } catch(e){
        console.log("something went wrong")
    }
}

export default connectDB;