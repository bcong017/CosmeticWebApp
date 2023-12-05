const db = require("../models");

const getItemsByCategory = async (req, res) => {
  try {
    const selectedAttributes = ['name', 'price', 'brand'];
    const items = await db.Item.findAll({
      attributes: selectedAttributes,
      where : {
        category: req.params.categoryName
      }
    });

    const resultedItems = items.map(item => ({
      name: item.name,
      price: item.price,
      brand: item.brand.replace('Thương Hiệu', '').trim()
    }));

    return res.status(202).json({
      resultedItems
    })
  } catch (error) {
    return res.status(500).json({error})
  }
}



module.exports = {getItemsByCategory}