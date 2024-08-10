const Products = require("../models/productmodel");
const User = require("../models/usermodel");

module.exports.shop= async(req,res)=>{
    let products= await Products.find();
    res.render('shops',{products});
}

module.exports.discount=async(req,res)=>{
    let products= await Products.find();
    let filterProd=products.filter(product=>product.discount);
    res.render('shops',{products:filterProd})
}

module.exports.cartAdd=async(req,res)=>{
    try{
    let result=await User.findOne({username:req.user.username});
   let id=req.params.id;
   let newproduct= await Products.findById(id);
   let cartItem=result.cart.find(cart=>cart.product && cart.product.equals(newproduct._id));
   if(cartItem){
    cartItem.quantity+=1
   }
   else
   result.cart.push({product:newproduct._id, quantity:1});

   await result.save();
   req.flash('success','product added to cart');
    res.redirect('/shop')
    }catch(err){
        res.redirect('/');
        throw new ExpressError(500,err);
    }
}

module.exports.showCart=async (req, res) => {
    try {
        let user = await User.findOne({ username: req.user.username }).populate('cart.product');
       // user.cart = user.cart.filter(cartItem => cartItem.product !== null); Use it if found any error due to empty cart
        if(!user.cart){
            req.flash('error','No items in cart');
            res.redirect('/shop')
        }
        else
        // await user.save();
          res.render('cart', { cart: user.cart });
    } catch (err) {
        console.error(err);
        res.redirect('/');
        throw new ExpressError(500, err);
    }
};

module.exports.incCart=async(req,res)=>{
    
    let id =req.params.id;
    let newUser=await User.findById(id);

    let pid=req.params.pid;
    let newproduct=await Products.findById(pid)

    let cartItem=newUser.cart.find(cart=>cart.product && cart.product.equals(newproduct._id));
    if(!cartItem){
     req.flash('error','No item in cart');
     res.redirect('/shop');
    }
    else{
   cartItem.quantity+=1
   await newUser.save();
   let user = await User.findOne({ username: req.user.username }).populate('cart.product');
    res.render('cart', { cart: user.cart });
    }

}
module.exports.decCart=async(req,res)=>{
    
    let id =req.params.id;
    let newUser=await User.findById(id);

    let pid=req.params.pid;
    let newproduct=await Products.findById(pid)

    let cartItem=newUser.cart.find(cart=>cart.product && cart.product.equals(newproduct._id));
    if(!cartItem){
     req.flash('error','Item not found in cart');
     res.redirect('/shop')
    }
    if(cartItem.quantity==1)
       newUser.cart = newUser.cart.filter(cart => !cart.product.equals(newproduct._id));
    
    else
      cartItem.quantity-=1
   await newUser.save();
   let user = await User.findOne({ username: req.user.username }).populate('cart.product');

  res.render('cart', { cart: user.cart });

}