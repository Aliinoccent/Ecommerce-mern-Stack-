const categorySchema=require('../models/catgory.js')
const productSchema =require('../models/products.js');

exports.catgory=async(req,res)=>{
    const {name}=req.body;
    console.log(name);
    try{
        const newCatgory=new categorySchema({name});
        await newCatgory.save();
        res.json({data:newCatgory,succss:true,statuscode:200})
    }
   catch(error){
    res.json({data:'not created backend isue',succss:false,statuscode:500})
   }
    
    
}
exports.getCategory=async(req,res)=>{
    const categoryData= await categorySchema.find();
    try{
        if(categoryData){
            res.json({data:categoryData,status:true,statusCode:200})
        }
        else{
            res.json({data:categoryData,status:true,statusCode:200})
        }
    }
    catch(error){
        res.json({data:error,status:false,statusCode:500})
    }
    
    
}



exports.productAdd = async (req, res) => {
    const category = req.params.catgoryid;  // Retrieve category ID from URL params
    const { product, price, quantity, discription } = req.body;

    // Log product details
    console.log(`product ${typeof product}, price ${typeof price}, quantity ${typeof quantity}`);

    try {
        // Create a new product object with image path from req.file (if uploaded)
        const newProduct = new productSchema({
            product,
            price,
            quantity,
            discription,
            category,
            image: req.file ? req.file.path : null 
        });
        await newProduct.save();

        res.json({ data: newProduct, success: true, statusCode: 200 });
    } catch (error) {
        res.status(500).json({ data: error.message, success: false });
    }
};

exports.getallproductsByCategory=async(req,res)=>{
    const catgoryId=req.params.catgoryid;
    console.log(catgoryId);
    const allProducts=await productSchema.find({category:catgoryId});
    console.log(allProducts)
    res.json({data:allProducts})
}
exports.getallproducts= async(req,res)=>{
    const products= await productSchema.find();
    try{if(products){
        res.json({data:products,status:true,statsCode:200})
    }
    else{
        res.json({data:'not found data',status:true,statsCode:201})
    }}
    catch(error){
        res.json({error:error,status:false,statuscode:500})
    }
}
exports.getPriceOfProducts=async(req,res)=>{
    const price=req.params.price;
    const products=await productSchema.find({price:{$lte:price}});
    console.log(products,'this is products type');
    res.json({data:products,status:true,statuscode:200})
}
