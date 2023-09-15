const mongoose = require('mongoose')

const dailyWordSchema = mongoose.Schema(
  {
    word: {
      type: String,
      required: [true, 'Please add a word'],
    },
    date: {
        type: Date,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('DailyWord', dailyWordSchema, "DailyWords");
