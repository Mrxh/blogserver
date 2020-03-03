'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MessageSchema = new Schema({
    __v: { type: Number, select: false },
    nickname: { type: String, required: true },
    avtar: { type: String, required: true, default: 'tx1.jpg' },
    message: { type: String, required: true },
  }, { timestamps: true });

  return mongoose.model('Message', MessageSchema);
};
