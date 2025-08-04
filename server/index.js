import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import pageRoutes from "./routes/pageRoutes.js"
import blockRoutes from "./routes/blockRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"

dotenv.config();
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/pages", pageRoutes)
app.use("/api/blocks", blockRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
    
})