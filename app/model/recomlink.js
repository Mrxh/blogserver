'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ReLinkSchema = new Schema({
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    linkUrl: { type: String, required: true, default: 'https://www.baidu.com' },
    linkImg: { type: String, required: true, default: 'img/carousel/Carousel_0001.jpg' },
  }, { timestamps: true });

  return mongoose.model('Recomlink', ReLinkSchema);
};
