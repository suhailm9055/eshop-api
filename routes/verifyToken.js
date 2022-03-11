const jwt = require("jsonwebtoken");

const varifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      console.log(token+"token");
      if (err) {
        res.status(403).json("Token is not valid"); 
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are NOT authenticated");
  }
};

const varifyTokenAndAdmin = (req, res, next) => {
  varifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    }else {
        res.status(403).json("Your are Not authorised do that")
    }
  });
};
const varifyTokenAndAuthorization = (req, res, next) => {
  varifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }else {
        res.status(403).json("Your are Not authorised do that")
    }
  });
};
module.exports = { varifyToken,varifyTokenAndAuthorization,varifyTokenAndAdmin };
