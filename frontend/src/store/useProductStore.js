import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { Meta } from "react-router-dom";

// base url will be dynamic: based on the production and development
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

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
    },

    fetchProduct : async(id) => {
        set({loading:true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);
            set({
                currentProduct : response.data.data,
                formData : response.data.data ,//pre-fill form with current data
                error : null
            });
        } catch (error) {
            console.log("Error in fetchproduct function :",error);
            set({error : "Something went wrong" , currentProduct : null});
        }finally
        {
            set({loading : false});
        }
    },
    updateProduct : async(id) => {
        set({loading:true});
        
        try {
            const {formData} =  get();
            const response = await axios.put(`${BASE_URL}/api/products/${id}` , formData);
            set({currentProduct : response.data.data});
            toast.success("Product updated Successfully.");
        } catch (error) {
            toast.error("Something went wrong");
            console.log("ERROR : in updateProduct function" , error);
        }finally
        {
            set({loading : false});
        }
    },
}))