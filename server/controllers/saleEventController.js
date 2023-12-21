// controllers/saleEventController.js
const db = require("../models");

const createSaleEvent = async (req, res) => {
  try {
    const { eventName, discountPercentage, startDate, endDate, brand, category } = req.body;

    // Create the sale event
    const createdEvent = await db.SaleEvent.create({
      event_name: eventName,
      discount_percentage: discountPercentage,
      start_date: startDate,
      end_date: endDate,
      is_active: true,
    });

    // Find items based on brand or category (or both) and update sale_event_id
    const whereClause = {};
    if (brand) {
      whereClause.brand = {
        [db.Sequelize.Op.like]: `%${brand}%`,
      };
    }
    if (category) {
      whereClause.category = category;
    }

    const itemsToUpdate = await db.Item.findAll({
      where: whereClause,
    });

    // Update sale_event_id for all matching items
    await Promise.all(itemsToUpdate.map(item => item.update({ sale_event_id: createdEvent.id })));

    return res.status(201).json({ message: 'Sale event created successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateSaleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { eventName, discountPercentage, startDate, endDate, brand, category } = req.body;

    // Find the sale event to update
    const saleEventToUpdate = await db.SaleEvent.findByPk(eventId);

    if (!saleEventToUpdate) {
      return res.status(404).json({ message: 'Sale event not found' });
    }

    // Update sale event details
    await saleEventToUpdate.update({
      event_name: eventName || saleEventToUpdate.event_name,
      discount_percentage: discountPercentage || saleEventToUpdate.discount_percentage,
      start_date: startDate || saleEventToUpdate.start_date,
      end_date: endDate || saleEventToUpdate.end_date,
    });

    // Find items based on brand or category (or both) and update sale_event_id
    const whereClause = {};
    if (brand) {
      whereClause.brand = {
        [db.Sequelize.Op.like]: `%${brand}%`,
      };
    }
    if (category) {
      whereClause.category = category;
    }

    const itemsToUpdate = await db.Item.findAll({
      where: whereClause,
    });

    // Update sale_event_id for all matching items
    await Promise.all(itemsToUpdate.map(item => item.update({ sale_event_id: saleEventToUpdate.id })));

    return res.status(200).json({ message: 'Sale event updated successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteSaleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the sale event to delete
    const saleEventToDelete = await db.SaleEvent.findByPk(eventId);

    if (!saleEventToDelete) {
      return res.status(404).json({ message: 'Sale event not found' });
    }

    // Find items with the sale event id and update sale_event_id to null
    const itemsToUpdate = await db.Item.findAll({
      where: { sale_event_id: saleEventToDelete.id },
    });

    // Update sale_event_id to null for all matching items
    await Promise.all(itemsToUpdate.map(item => item.update({ sale_event_id: null })));

    // Delete the sale event
    await saleEventToDelete.destroy();

    return res.status(200).json({ message: 'Sale event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { createSaleEvent, updateSaleEvent, deleteSaleEvent };
