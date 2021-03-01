function checkIfAwesome(req, res, next) {
  if (req.query.awesome) {
    next()
  } else {
    next('NOT AWESOME');
  }
}

module.exports = checkIfAwesome