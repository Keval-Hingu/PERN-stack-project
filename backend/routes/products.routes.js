import express from "express";
import { getAllProducts ,  createProducts} from "../controllers/products.js";

const route = express.Router();
route.get('/', getAllProducts);
route.post("/" , createProducts)

export default route;