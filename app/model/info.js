'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const InfoSchema = new Schema({
    partner: {
      type: String
    },
    player: {
      type: String
    },
    month: {
      type: Number
    },
    day: {
      type: Number
    },
    time: {
      type: Number
    }
  });

  return mongoose.model('Info', InfoSchema);
};
