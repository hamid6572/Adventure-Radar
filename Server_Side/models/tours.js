const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required'],
      trim: true,
    },
    duration: {
      type: Number,
      required: true
    },
    maxGroupSize: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
     locations: [
      {
        type: {
          type: String,
        },
      }
    ],
   }
);

module.exports = mongoose.model('Tour', tourSchema);
