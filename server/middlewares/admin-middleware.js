const adminMiddleware = (req, res, next) => {
  try {
    // console.log(req.user);
    const adminRole = req.user.isAdmin;
    // console.log("Admin Role: ", adminRole);
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access Denied. You are not an admin." });
    }
    // If the user is an admin then proceed to the next middleware
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = adminMiddleware;
