const express = require('express');
const route = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const Submission = require('../models/submission');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  }
});

const multipleUpload = multer({ storage: storage }).single('image');
const BUCKET_NAME = 'myronbankbank';

route.post('/', multipleUpload, function (req, res) {
  const file = req.file;
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY
  });

  const params = {
    Bucket: BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ACL: "public-read",
    CreateBucketConfiguration: {
      LocationConstraint: "ap-southeast-1"
    }
  };

  s3bucket.upload(params, function (err, data) {
    if (err) {
      res.json({ "error": true, "Message": err });
    } else {
      db_createNewEntry(data.Location)
        .then(product => res.send(product))
        .catch(err => res.send(err));
    }
  });

  function db_createNewEntry(image) {
    let sumbission = new Submission({
      image: image
    })

    return sumbission.save();
  }

});

route.get('/', async function (req, res) {
  const submissions = await Submission.find({ approved: true }).select("-__v");
  res.send(submissions);
})

module.exports = route;

