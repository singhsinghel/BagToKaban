const User = require('../models/usermodel');
const Products=require('../models/productmodel');

module.exports.create=async(req,res)=>{
    let{name,price,discount,bgcolor,panelColor,textColor,description}=req.body;
     const newProduct= new Products
     ({name,price,discount,bgcolor,panelColor,description,textColor,image:req.file.buffer});
     newProduct.owner=req.user._id;
     await newProduct.save();
     req.flash('success','new product saved!');
    res.redirect('/shop');
    }

    module.exports.show=async(req,res)=>{
        let id=req.params.id;
        let product= await Products.findById(id).populate({
         path:'review',
         populate:{
             path:'author',
         }
     }).populate('owner').exec();
        let curruser=req.user;
         res.render('show',{product,curruser})
         
 }

 module.exports.update=async(req,res)=>{
    let id=req.params.id;
    let product=await Products.findById(id);
    res.render('updateProduct',{product}) 
}

module.exports.postUpdate=async(req,res)=>{
    let id=req.params.id;
    let{name,price,discount,bgcolor,panelColor,textColor,description}=req.body;
    const newProduct= await Products.findByIdAndUpdate(id,{name,price,discount,bgcolor,panelColor,textColor,description,image:req.file?req.file.buffer:undefined},{new:true});

    req.flash('success','product updated');
    res.redirect(`/products/${id}/show`);

}

module.exports.delete=async(req,res)=>{
    let id=req.params.id;
      await Products.findByIdAndDelete(id);
      req.flash('success',"Product Deleted");
      res.redirect('/shop');
  
  }