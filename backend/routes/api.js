const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let express = require('express');
let router = express.Router();

const User = require('../models/userModel');
const GameResult = require('../models/gameResultsModel');
const DailyWord = require('../models/dailyWordModel');
const {protect} = require('../middleware/auth');
var { computeResult } = require('../helpers/helpers');


const MAX_GUESSES = 7;
const ALL_CORRECT = "ccccccc";
const GUESS_PENALTY = 10;

router.get('/test', (req, res) => {
    res.json({msg:"It worked!"});
});

router.get('/testprotect', protect, (req, res)=> {
    res.json({msg:"It worked!"});
})

/* GET home page. */
// req.body => {"guess": "hebrews", "guessNumber": 3 }
router.post('/guess', async function(req, res) {
    //extract the guess and the guess number
    const {guess, guessNumber} = req.body;

    // extract the user
    //const {email, username} = req.user;

    const email = "kcasey@fhu.edu";
    const username = "kenancasey";

    console.log( new Date().toDateString() );
    const currentDate = new Date( new Date().toDateString() );

    console.log(currentDate);
    const todaysWord = await DailyWord.findOne({date: currentDate});
    
    // TODO
    // compute the result
    let result = "";

    if(todaysWord) {
        console.log("today's word: " + todaysWord.word);
        result = computeResult(todaysWord.word.toUpperCase(), guess.toUpperCase());
    }
    else {
        console.log("No words found with that date. Using 'HEBREWS'");
        result = computeResult("hebrews".toUpperCase(), guess.toUpperCase());
    }

    // save results to database (if guess was correct or the game is over)
    // WIN
    if( result == ALL_CORRECT) {
        const gameResult = await GameResult.create({
            email:email,
            username:username,
            date: new Date(),
            numGuesses: guessNumber,
            gameWon: 1
        });
    } 
    // LOSS
    else if (guessNumber == MAX_GUESSES) {
        const gameResult = await GameResult.create({
            email:email,
            username:username,
            date: new Date(),
            numGuesses: GUESS_PENALTY,
            gameWon: 0
        });
    }

    // return the guess and guess result
    res.json({guess, result});
});

// POST     /api/register
router.post('/register' , async (req, res)=> {
    const {password, email, username} = req.body;

    if( !password || !email || !username) {
        res.status(400).json({msg: "Missing email or password or username"});
    }

    const emailExists = await User.findOne( {email});
    const usernameExists = await User.findOne( {username});

    if(emailExists || usernameExists) {
        res.status(400).json({msg:"Email or username is already taken"});
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create( {
        email: email,
        username: username,
        password: hashedPassword
    });

    if (newUser) {
        res.status(201).json({
          email: newUser.email,
          username: newUser.username,
          token: generateToken(newUser.email),
        })
      } else {
        res.status(400)
      }

});

router.post( '/login', async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne( { email: email} );

    if( user && await bcrypt.compare(password, user.password) ) {
        res.json( {
            _id : user.id,
            email: user.email,
            token: generateToken( user.email )
        });
    }
    else {
        res.status(400).send({msg: "Error: Invalid username/password"});
    }
});

const generateToken = (email, username) => {
    return jwt.sign( {email, username}, process.env.JWT_SECRET, {expiresIn:'30d'});
}


module.exports = router;
