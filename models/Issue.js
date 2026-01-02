const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // we can store image filename for now
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Issue", issueSchema);
