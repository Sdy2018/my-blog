const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: String,
  content:String,
  digest:String,
  tags:Array,
  text:String,
  _id: Number
},{
  timestamps: true
});

const articleModel = mongoose.model('Article', articleSchema);


module.exports = articleModel

