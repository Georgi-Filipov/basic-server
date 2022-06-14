const jwt = require("jsonwebtoken");
const { JST_SECRET } = require("../config");

const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (req.url === '/login' || req.url === '/register' || token === 'super-token') return next();

  if (!token) {
    res.status(401).jsonp({ message: 'Access was denied! Provide "Authorization" header.' });
  } else {
    const tokenBody = token.slice(7);
    jwt.verify(tokenBody, JST_SECRET, (err, decoded) => {
      if (err) {
        console.log(`JWT error: ${err}`);
        res.status(401).jsonp({ message: 'Access was denied!' });
      } else {
        if (decoded.exp < decoded.iat) {
          res.status(401).jsonp({ message: 'Access was denied! Your token was expired.' });
        } else {
          next();
        }
      }
    });
  }
}

module.exports = auth;