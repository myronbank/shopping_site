const express = require('express');
const route = express.Router();
const Product = require('../models/product');
const isAuth = require('../middleware/isAuth');
const AWS = require('aws-sdk');
const multer = require('multer');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  }
});

const BUCKET_NAME = 'myronbankbank';
const multipleUpload = multer({ storage }).fields([{ name: "name" }, { name: "image" }, { name: "brand" }, { name: "price" }, { name: "category" }, { name: "countInStock" }, { name: "description" }])

route.post('/', isAuth, multipleUpload, async function (req, res) {
  const file = req.files.image;
  const imagesLocation = [];

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
        if (imagesLocation.length == file.length) {
          db_createNewEntry(req.body.name, imagesLocation, req.body.brand, req.body.price, req.body.category, req.body.countInStock, req.body.description)
            .then(product => res.send(product))
            .catch(err => res.send(err));
        }
      }
    });


  })
})
function db_createNewEntry(name, images, brand, price, category, countInStock, description) {
  let product = new Product({
    name: name,
    image: images,
    brand: brand,
    price: price,
    category: category,
    countInStock: countInStock,
    description: description,
  })

  return product.save();
}


module.exports = route;
