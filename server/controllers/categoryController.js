const Item = require("../models/item");
const db = require("../models");
const { item } = require("../models/item");

// exports.getItemsByCategory = (req, res) => {
//   const requestCategory = req.params.categoryName;
//   console.log(requestCategory);
//   item
//     .findAll({ where: { category: requestCategory } })
//     .then((item) => {
//       res.status(202).json(item);
//     })
//     .catch((err) => {
//       res.status(404).json({
//         message: "Loi",
//       });
//     });
// };

const getItemsByCategory = async (req, res) => {
  try {
    const items = await db.Item.findAll({
      where : {
        category: req.params.categoryName
      }
    });
    return res.status(202).json({
      items
    })
  } catch (error) {
    return res.status(500).json({error})
  }
}

module.exports = {getItemsByCategory}