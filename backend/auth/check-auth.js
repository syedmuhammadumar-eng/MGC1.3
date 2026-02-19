// const jwtTokenSecret = require('../.env');
const jwtTokenSecret = process.env.jwtTokenSecret || "super-duper-secret";
const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        if (!token) { 
            return next(new HttpError('Not Authorized', 401))
        }
        const decodedToken = jwt.verify(token, jwtTokenSecret)
        next()
    } catch (err) {
        return next(new HttpError('Authentication Failed', 401))
    }
}