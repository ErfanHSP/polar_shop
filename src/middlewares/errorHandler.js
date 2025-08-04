const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = {};
    err.inner.forEach((e) => {
      errors[e.path] = e.message;
    });

    return res.status(422).json({
      success: false,
      errors,
    });
  }
  console.log("internal server error: ", err);
  
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
}

module.exports = errorHandler