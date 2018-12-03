const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access denied. No token found.');
  }

  try {
    const decoded = jwt.verify(token, config.get('myPrivateKey'));
    req.user = decoded;
    next();

  } catch (ex) {
    console.log(`Exception in verifying token ${ex.message}`);
    res.status(400).send('Invalid token.');
  }  
}