const mongoose = require('mongoose')

const gameResultSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    username: {
      type: String,
      required: [true, 'Please add a username'],
    },
    date: {
        type: Date,
        default: new Date()
    },
    numGuesses: {
        type: Number,
        required:[true, 'Please add a number of guesses']
    },
    // 1 or 0
    gameWon: {
        type: Number,
        default: 0
    }
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('GameResult', gameResultSchema, "GameResults");
