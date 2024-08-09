const Review = require('../models/reviewmodel');
const Products = require('../models/productmodel');

module.exports.create= async(req,res)=>{
    let id=req.params.id;
    let product= await Products.findById(id);
    let {review}=req.body;
    review.author=req.user;
    let newReview= new Review(review);
    product.review.push(newReview);

    await newReview.save();
    await product.save();
    res.redirect(`/products/${id}/show`)
}

module.exports.delete=async(req,res)=>{
    let{pid,rid} = req.params;
    await Products.findByIdAndUpdate(pid,{$pull:{review:rid}});
    await Review.findByIdAndDelete(rid);
   res.redirect(`/products/${pid}/show`);
}