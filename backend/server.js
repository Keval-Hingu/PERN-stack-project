import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// import routes :
import productRoutes from "./routes/products.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares : 

app.use(express.json());
app.use(helmet()); // helmet is a security middleware that helps to protect our app by setting http headers
app.use(morgan("dev")); // log the request.
app.use(cors());


// initial setup :

// app.get("/test" ,(req, res)=>{
//     res.send ("Hello from PERN Stack");
//     console.log("test Route is accessed");
//     // console.log(res.getHeaders()); // limited information is provided without helmet
// })

// APIs :

app.use("/api/products" , productRoutes);


app.listen(PORT,()=>{
    console.log(`APP is Listening on PORT : ${PORT}`);
})