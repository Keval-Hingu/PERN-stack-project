import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

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

    setFormData : (formData) => set({formData}),
    resetForm : ()=>set({ formData : { name: "" , image:"" , price: ""}}),
    
    addProduct : async(e)=>{
        e.preventDefault();
        console.log("Function is called");
        set({loading : true}); 
        
        try {
            const {formData } = get();
            console.log(formData);
            await axios.post(`${BASE_URL}/api/products` , formData);
            await get().fetchProducts();
            get().resetForm();
            toast.success("Product added Successfully.");
            document.getElementById("add_product_modal").close();
        } catch (error) {
            console.log("ERROR (FRONTEND) : IN addproduct function : ",error);
            toast.error("Something Went Wrong.");
        }finally
        {
            set({loading : false}); 
        }
    },

    fetchProducts : async ()=>{
        set({loading : true});
        try {
            console.log("fetchProducts called");
            const response = await axios.get(`${BASE_URL}/api/products`);
            set({products :response.data.data , error : null});
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