const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token missing
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access - token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden - invalid token" });
    }

    req.user = decoded; // decoded will have { email }
    next();
  });
};

module.exports = verifyJWT;

