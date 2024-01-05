// controllers/multiController.js
const db = require('../models');
const { Op } = require("sequelize");

const getAllBrands = async (req, res) => {
  try {
    // Find all distinct brands from the items
    const brands = await db.Item.findAll({
      attributes: [
        [db.sequelize.fn('DISTINCT', db.sequelize.col('brand')), 'brand'],
      ],
      where: {
        brand: {
          [db.Sequelize.Op.ne]: null, // Exclude null brands
        },
      },
    });

    // Extract the brand names from the result
    const brandNames = brands.map((brand) => brand.brand);

    return res.status(200).json({ brands: brandNames });
  } catch (error) {
    console.error('Error getting brands:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDistinctCategories = async (req, res) => {
  try {
    // Fetch distinct categories from the database
    const distinctCategories = await db.Item.findAll({
      attributes: [
        [db.sequelize.fn('DISTINCT', db.sequelize.col('category')), 'category']
      ],
      where: {
        // Additional conditions if needed
      }
    });

    // Map the categories with custom names
    const mappedCategories = {};
    distinctCategories.forEach(category => {
      switch (category.category) {
        case "TayTrang":
          mappedCategories.TayTrang = "Tẩy Trắng";
          break;
        case "VungKin":
          mappedCategories.VungKin = "Nước hoa vùng kín";
          break;
        case "PhanNuoc":
          mappedCategories.PhanNuoc = "Phấn nước Cushion";
          break;
        case "DauXa":
          mappedCategories.DauXa = "Dầu xả";
          break;
        case "KemLot":
          mappedCategories.KemLot = "Kem lót";
          break;
        case "KemNen":
          mappedCategories.KemNen = "Kem nền";
          break;
        case "ToanThan":
          mappedCategories.ToanThan = "Nước hoa xịt toàn thân";
          break;
        default:
          mappedCategories[category.category] = category.category;
      }
    });

    return res.status(200).json(mappedCategories);
  } catch (error) {
    console.error("Error getting distinct categories:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllBrands, getDistinctCategories };
