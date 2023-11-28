const models = require("../models");

function index(req, res) {
  models.Category
  .findAll()
  .then(result => {
    res.status(200).json(result);
  }
  ).catch(err => {
    res.status(500).json(err)
  });
}


module.exports = {
    index: index
}