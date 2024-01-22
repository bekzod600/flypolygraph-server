module.exports = function (err, req, res, next) {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status).send("Serverda kutilmagan xato ro`y berdi ", err.message);
};
