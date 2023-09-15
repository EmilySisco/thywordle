const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const protect = async(req, res, next) => {

    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) 
    {
        try {

            token = req.headers.authorization.split( ' ' )[1];

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findOne({email: decodedToken.email}).select('-password');

            next();
        }
        catch(error) {
            console.log(error);
            res.status(401).send( {msg:"Not authorized!"});
        }
    }

    if(!token) {
        res.status(401).send( {msg:"Not authorized! NO TOKEN!"});
    }
}

module.exports = { protect };