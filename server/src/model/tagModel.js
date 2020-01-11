const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  articleId: String,
  tag:String,
  digest:String,
  title: String,
  tags:Array
});

const tagModel = mongoose.model('Tag', tagSchema);


module.exports = tagModel
