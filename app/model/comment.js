'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
    __v: { type: Number, select: false },
    nickname: { type: String, required: true },
    email: { type: String, required: false },
    content: { type: String, required: true },
    articleId: { type: String, required: true },
  }, { timestamps: true });

  return mongoose.model('Comment', CommentSchema);
};
