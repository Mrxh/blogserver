'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema({
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    author: { type: String, required: true },
    keywords: { type: String, required: true },
    label: { type: String, required: false },
    title_page_img: { type: String, required: false, default: 'title_page_img.jpg' },
    article: { type: String, required: true, select: false },
    article_html: { type: String, required: true },
    intro: { type: String, required: true },
    views: { type: Number, required: false, default: 1 },
    arttype: { type: String, required: false, default: 'blog' },
    commentnum: { type: Number, required: false, default: 0 },
    isRaise: { type: Number, required: false, default: 0 },
    isRecommend: { type: Number, required: false, default: 0 },
    carenum: { type: Number, required: false, default: 1 },
  }, { timestamps: true });

  return mongoose.model('Article', ArticleSchema);
};
