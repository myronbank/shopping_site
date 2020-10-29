const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  image: { type: String },
  approved: { type: Boolean, default: false }
})

const Submission = mongoose.model("submissions", submissionSchema);
module.exports = Submission;


