const jwt = require("jsonwebtoken");
const config = require("config");

exports.isLoggedIn = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  //Check ij no token
  if (!token) {
    res.status(401).json({ msg: "No token, auth denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

exports.accessTo = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
