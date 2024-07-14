import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URI);

app.use(express.json());//to parse req.body
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());
app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectMongoDB();
});
