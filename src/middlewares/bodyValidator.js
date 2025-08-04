const bodyValidator = (schema) => {
  return async (req, res, next) => {
    try {
      if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({
          success: false,
          message: "Request body must be a non-null JSON object!",
        });
      }

      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = bodyValidator