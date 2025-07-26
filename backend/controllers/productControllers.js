import { sql } from "../config/db.js";

export const getProducts = async (req,res)=> {
    try {
        const products = await sql`SELECT * FROM products`;
        // console.log(data);
        res.status(200).json({
            success : true ,
            data : products
        });
        
    } catch (error) {
        console.log("ERROR in getProducts Handler ");
        res.status(500).json({success : false , message : error});
    }

}

export const createProduct = async (req,res) => {
    const { name , image , price  } = req.body;

    if(!name || !image || !price)
    {
        return res.status(400).json({success : false , message : "All fields are required."});
    }

    try {
        // insert product in the database: 
        
        const newProduct = await sql `INSERT INTO products(name,image,price) 
        VALUES(${name},${image},${price})
        RETURNING *`;

        
        res.status(201).json({
        success: true,
        data :  newProduct[0]
        });

    } catch (error) {
        console.log("ERROR : in createProduct controller");
        res.status(500).json({success : false , message : "Internal server Error"});        
    }
}

export const getProduct = async (req,res)=> {

    const {id} = req.params;
    try {

        //product is an array
        const product = await sql `
        SELECT * FROM products WHERE id = ${id}
        `;

        if(product.length===0)
        {
            return res.status(400).json({success:false , message:"Product is not Available"});
        }
        
        res.status(200).json({success:true , data: product[0]});

    } catch (error) {
        console.log("ERROR : IN getProduct controller" );
        res.status(500).json({success : false , message : "Internal server error."});
    }

}
export const updateProduct = async (req,res)=> {
    const { id } = req.params;
    const { name , image, price } = req.body;
    try {
        const updatedProduct = await sql`
        UPDATE products
        SET name=${name}, image=${image}, price=${price}
        WHERE id=${id}
        RETURNING *;
        `;
        
        if(updatedProduct.length ===0)
        {
            return res.status(404).json({success : false , message : "Product not found"});
        }

        res.status(200).json({success:true , data : updatedProduct[0]});
    } catch (error) {
        console.log("ERROR : in updateProduct controller.");
        res.status(500).json({success : false , message:"Internal Server Error"});
    }

}
export const deleteProduct = async (req,res)=> {
    const {id} = req.params;

    try {

        const deletedProduct = await sql`
            DELETE FROM products WHERE id=${id}
            RETURNING *
        `;

        if(deletedProduct.length===0)
            return res.status(404).json({success:false , message:"Product not Found"});
        
        res.status(200).json({success:true , data : deletedProduct[0]});
    } catch (error) {
        console.log("ERROR : IN deleteProduct Controller");
        res.status(500).json({success:false , message : "Internal Server Error"});
    }
}

 