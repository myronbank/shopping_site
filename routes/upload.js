const express = require('express');
const route = express.Router();
const Product = require('../models/product');
const isAuth = require('../middleware/isAuth');
// const isAdmin = require('../middleware/isAdmin');
const AWS = require('aws-sdk');
const multer = require('multer');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  }
});
// const multipleUpload = multer({ storage: storage }).array('file');
// 

const BUCKET_NAME = 'myronbankbank';
const multipleUpload = multer({ storage }).fields([{ name: "name" }, { name: "image" }, { name: "brand" }, { name: "price" }, { name: "category" }, { name: "countInStock" }, { name: "description" }])

route.post('/', multipleUpload, async function (req, res) {
  const file = req.files.image;
  const imagesLocation = [];
  // fileUpload(file, imagesLocation = [], req);
  // product = await db_createNewEntry(req.body.name, imagesLocation, req.body.brand, req.body.price, req.body.category, req.body.countInStock, req.body.description)
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY
  });

  file.map((item) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: item.originalname,
      Body: item.buffer,
      ACL: "public-read",
      CreateBucketConfiguration: {
        LocationConstraint: "ap-southeast-1"
      }
    };

    s3bucket.upload(params, function (err, data) {
      if (err) {
        res.json({ "error": true, "Message": err });
      } else {
        imagesLocation.push(data.Location);
        // imagesLocation.push(data);
        if (imagesLocation.length == file.length) {
          db_createNewEntry(req.body.name, imagesLocation, req.body.brand, req.body.price, req.body.category, req.body.countInStock, req.body.description)
            .then(product => res.send(product))
            .catch(err => res.send(err));
        }
      }
    });

    // return imagesLocation;
  })
})
// const imagesLocation = []
// ResponseData.data.map(data => imagesLocation.put(data.location));


// route.post('/createBucket', (req, res) => {
//   const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ID,
//     secretAccessKey: process.env.AWS_KEY
//   })

//   const params = {
//     Bucket: req.body.bucketName,
//     CreateBucketConfiguration: {
//       LocationConstraint: "ap-southeast-1"
//     }
//   }

//   s3.createBucket(params, function (err, data) {
//     if (err) res.send(err);
//     if (ResponseData.length == file.length) {
//       res.json({ "error": false, "Message": "Bucket is successfully created" });
//     }
//   })
// })
function db_createNewEntry(name, images, brand, price, category, countInStock, description) {
  let product = new Product({
    name: name,
    image: images,
    brand: brand,
    price: price,
    category: category,
    countInStock: countInStock,
    description: description,
    // rating: req.body.rating,
    // numReviews: req.body.numReviews
  })

  return product.save();
}


// function fileUpload(file, imagesLocation, req) {
//   let s3bucket = new AWS.S3({
//     accessKeyId: process.env.AWS_ID,
//     secretAccessKey: process.env.AWS_KEY
//   });
//   console.log("function got called");
//   file.map((item) => {
//     const params = {
//       Bucket: BUCKET_NAME,
//       Key: item.originalname,
//       Body: item.buffer,
//       ACL: "public-read",
//       CreateBucketConfiguration: {
//         LocationConstraint: "ap-southeast-1"
//       }
//     };

//     s3bucket.upload(params, async function (err, data) {
//       if (err) {
//         res.json({ "error": true, "Message": err });
//       } else {
//         // imagesLocation.push(data.location);
//         imagesLocation.push(data);
//         if (imagesLocation.length == file.length) {
//           const product = await db_createNewEntry(req.body.name, imagesLocation, req.body.brand, req.body.price, req.body.category, req.body.countInStock, req.body.description);
//           res.send(product);
//         }
//       }
//     });

//     // return imagesLocation;
//   })
// };


module.exports = route;
