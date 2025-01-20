const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "BACKEND ERROR";
  const extraDetails = err.extraDetails || "ERROR FROM BACKEND";
  // console.log("From error middleware: ", status, message, extraDetails);
  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
