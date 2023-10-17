// To verify token wheather it exists or not 
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');
  
const verifyToken = (req, res, next) => {
    
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(403); // Forbidden
  
    jwt.verify(token.split(' ')[1], secretKey, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      req.user = user;
      next();
    });
  };

module.exports = {verifyToken}