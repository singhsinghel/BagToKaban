const cloudinary= require('cloudinary').v2;
const {CloudinaryStorage}= require('multer-storage-cloudinary');
const multer=require('multer');2
const storage=multer.memoryStorage();
const upload=multer({storage:storage})

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const storage2 = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'BagtoKaban_dev',
      allowedFormats: ['png','jpg','jpeg'],
    },
  });

  // module.exports={
  //   cloudinary,
  //   storage,
  // }

  module.exports=upload;