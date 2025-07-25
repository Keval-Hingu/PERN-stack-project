export const getAllProducts = (req,res)=> {
    return res.status(200).json({
        success : true,
        data : [
            { id : 1 , name: "books"},
            { id : 2 , name: "mobiles"},
            { id : 3 , name: "laptop"},
        ]
    })
}
export const createProducts = (req,res)=> {
    
}

 