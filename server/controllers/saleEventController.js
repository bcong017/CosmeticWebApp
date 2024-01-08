// controllers/saleEventController.js
const db = require("../models");

const createSaleEvent = async (req, res) => {
  try {
    const { event_name, discount_percentage, start_date, end_date, brand, category } = req.body;

    // Create the sale event
    const createdEvent = await db.SaleEvent.create({
      event_name: event_name,
      discount_percentage: discount_percentage,
      start_date: start_date,
      end_date: end_date,
      is_active: true,
      brand: brand || null, // Store the brand if provided, otherwise null
      category: category || null, // Store the category if provided, otherwise null
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
    await Promise.all(itemsToUpdate.map(item => item.update({ sale_event_id: createdEvent.id, is_on_sale: true })));

    // Update is_on_sale status for associated items
    await updateIsOnSaleStatus();

    return res.status(201).json({ message: 'Sale event created successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateSaleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { event_name, discount_percentage, start_date, end_date, brand, category } = req.body;

    // Find the sale event to update
    const saleEventToUpdate = await db.SaleEvent.findByPk(eventId);

    if (!saleEventToUpdate) {
      return res.status(404).json({ message: 'Sale event not found' });
    }

    // Store the old brand and category for later use
    const oldBrand = saleEventToUpdate.brand;
    const oldCategory = saleEventToUpdate.category;

    // Update sale event information
    saleEventToUpdate.event_name = event_name;
    saleEventToUpdate.discount_percentage = discount_percentage;
    saleEventToUpdate.start_date = start_date;
    saleEventToUpdate.end_date = end_date;
    saleEventToUpdate.brand = brand || null;
    saleEventToUpdate.category = category || null;

    // Save the updated sale event
    await saleEventToUpdate.save();

    // Reload the instance to fetch the latest data
    await saleEventToUpdate.reload();

    // Update items related to the old sale event
    await db.Item.update(
      { sale_event_id: null, is_on_sale: false },
      { where: { sale_event_id: eventId } }
    );

    // Update items related to the new sale event
    if (brand || category) {
      const whereClause = {};
      if (brand) {
        whereClause.brand = { [db.Sequelize.Op.like]: `%${brand}%` };
      }
      if (category) {
        whereClause.category = category;
      }

      await db.Item.update(
        { sale_event_id: eventId, is_on_sale: true },
        { where: whereClause }
      );
    }

    return res.status(200).json({ message: 'Sale event updated successfully' });
  } catch (error) {
    console.error('Error updating sale event:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
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
    await Promise.all(itemsToUpdate.map(item => item.update({ is_on_sale: 0, sale_event_id: null })));

    // Delete the sale event
    await saleEventToDelete.destroy();

    return res.status(200).json({ message: 'Sale event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateIsOnSaleStatus = async () => {
  try {
    const currentDate = new Date();

    // Find all items with an associated sale event
    const itemsWithSaleEvent = await db.Item.findAll({
      include: [
        {
          model: db.SaleEvent,
          where: {
            is_active: true,
          },
        },
      ],
    });

    // Update is_on_sale status based on the current date and end date of the sale event
    await Promise.all(
      itemsWithSaleEvent.map(async (item) => {
        if (item.SaleEvent && item.SaleEvent.end_date < currentDate) {
          // If end date is in the past, set is_on_sale to false
          await item.update({ is_on_sale: false });
        } else {
          // Otherwise, set is_on_sale to true
          await item.update({ is_on_sale: true });
        }
      })
    );

    console.log('is_on_sale status updated successfully');
  } catch (error) {
    console.error('Error updating is_on_sale status:', error);
  }
};

module.exports = { createSaleEvent, updateSaleEvent, deleteSaleEvent, updateIsOnSaleStatus };
