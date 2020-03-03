'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const LabelSchema = new Schema({
    __v: { type: Number, select: false },
    typename: { type: String, required: true },
    artnum: { type: Number, required: false, default: 1 },
  });

  return mongoose.model('Labels', LabelSchema);
};
