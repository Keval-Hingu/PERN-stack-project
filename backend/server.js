import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares : 

app.use(express.json());
app.use(helmet()); // helmet is a security middleware that helps to protect our app by setting http headers
app.use(morgan("dev")); // log the request.
app.use(cors());


app.get("/test" ,(req, res)=>{
    res.send ("Hello from PERN Stack");
    console.log("test Route is accessed");
    // console.log(res.getHeaders()); // limited information is provided without helmet
})


app.listen(PORT,()=>{
    console.log(`APP is Listening on PORT : ${PORT}`);
})