const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization"); //retrieving authentication header as bearer
  try {
    if (!authHeader) {
      throw new Error("No authentication header found.");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "someverysecretkey"); //verifying token with assigned key at login
    if (!decoded) {
      throw new Error("Not authenticated");
    }
    req.userId = decoded.id;
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
  next();
};
