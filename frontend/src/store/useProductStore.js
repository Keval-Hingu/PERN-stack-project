import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set,get)=>({
    // product state :
    products: [],
    loading: false,
    error: null,
    currentProduct : null,

    // Form state :
    formData:{
        name : "",
        image : "",
        price : "",
    },

    fetchProducts : async ()=>{
        set({loading : true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products`);
            set({products :  response.data.data , error : null});
        } catch (err) {
            if(err.status == 429) set({error :"Error rate limiting exceeded" , products : []});
            else set({error : "Something went wrong." , products : []});
        }finally{
            set({loading:false});
        }
    },

    deleteProduct : async(id)=> {
        set({loading:true});
        try{
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set(prev => ({products: prev.products.filter(product => product.id !== id)}));
            toast.success("Product deleted Successfully.");
        }catch(error){
            console.log("ERROR FRONTEND: In DeleteProduct function");
            toast.error("Something Went wrong");
        }finally{
            set({loading:false});
        }
    }
}))