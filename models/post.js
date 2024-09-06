const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/dataAssociation`);

const postSchema = mongoose.Schema({
  postData: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
