import express from "express";
import { getProducts ,  createProduct , getProduct , updateProduct , deleteProduct } from "../controllers/productControllers.js";

const route = express.Router();
route.get('/', getProducts);
route.get("/:id" ,getProduct);
route.post("/" , createProduct);
route.put("/:id" , updateProduct);
route.delete("/:id" , deleteProduct);
export default route;