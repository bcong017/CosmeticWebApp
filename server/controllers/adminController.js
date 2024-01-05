// controllers/adminController.js
const db = require("../models");

const getAllUserAccounts = async (req, res) => {
  try {
    // Get all user accounts
    const users = await db.User.findAll({
      attributes: [
        "id",
        "username",
        "name",
        "phone_number",
        "address",
        "is_active",
      ],
    });

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error getting user accounts: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const adminDeactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user is already deactivated
    if (user.is_active == false) {
      return res.status(400).json({ message: "User is already deactivated." });
    }

    // Deactivate the user
    user.is_active = false;
    await user.save();

    return res
      .status(200)
      .json({ message: "User deactivated by admin successfully" });
  } catch (error) {
    console.error("Error deactivating user by admin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order
    const order = await db.Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    switch (order.is_confirm) {
      case 0:
        await order.update({
          is_confirm: 1,
          dateConfirmed: new Date(),
        });
        return res
          .status(200)
          .json({ message: "Order confirmed successfully" });
      case 1:
        return res
          .status(400)
          .json({ error: "Cannot confirm an already confirmed order" });
      case 2:
        return res
          .status(400)
          .json({ error: "Cannot confirm an already rejected order" });
      default:
        return res
          .status(400)
          .json({ error: "Invalid order state for confirmation" });
    }
  } catch (error) {
    console.error("Error confirming order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const rejectOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order
    const order = await db.Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    switch (order.is_confirm) {
      case 0:
        await order.update({
          is_confirm: 2,
          dateRejected: new Date(),
        });
        return res
          .status(200)
          .json({ message: "Order rejected successfully" });
      case 1:
        return res
          .status(400)
          .json({ error: "Cannot rejected an already confirmed order" });
      case 2:
        return res
          .status(400)
          .json({ error: "Cannot rejected an already rejected order" });
      default:
        return res
          .status(400)
          .json({ error: "Invalid order state for confirmation" });
    }
  } catch (error) {
    console.error("Error confirming order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addItem = async (req, res) => {
  try {
    const {
      name,
      image_urls,
      price,
      brand,
      category,
      ingredients,
      quantity,
      product_information,
      use_information,
      Barcode,
      Country,
      ProductionPlaces,
      Skin,
      Sex,
      Type,
    } = req.body;

    const specifications = {
      Barcode,
      Brand: brand,
      Country,
      ProductionPlaces,
      Skin,
      Sex,
      Type,
    };

    const imageUrlsArray = image_urls.split(', ');

    // Convert specifications to a JSON string
    const specificationsString = JSON.stringify(specifications);

    // Create the item
    const createdItem = await db.Item.create({
      name,
      price,
      image_urls: imageUrlsArray.join('***'),
      brand,
      category,
      ingredients,
      quantity,
      product_information,
      use_information,
      specifications: specificationsString,
    });

    await updateItemWithExistingSaleEvent(createdItem);

    return res.status(201).json({ message: 'Item created successfully', item: createdItem });
  } catch (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const {
      name,
      image_urls,
      price,
      brand,
      category,
      ingredients,
      quantity,
      product_information,
      use_information,
      Barcode,
      Country,
      ProductionPlaces,
      Skin,
      Sex,
      Type,
    } = req.body;

    // Find the item to edit
    const itemToEdit = await db.Item.findByPk(itemId);

    if (!itemToEdit) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const imageUrlsArray = image_urls.split(', ');

    // Check if brand or category is changed
    const isBrandChanged = brand && brand !== itemToEdit.brand;
    const isCategoryChanged = category && category !== itemToEdit.category;

    // If brand or category is changed, check for existing sale event and override if needed
    if (isBrandChanged || isCategoryChanged) {
      const existingEvent = await db.SaleEvent.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { brand: brand, is_active: true },
            { category: category, is_active: true },
          ],
          end_date: {
            [db.Sequelize.Op.gt]: new Date(), // Check if end date is in the future
          },
        },
      });

      // If there's an existing event, override the old sale event
      if (existingEvent) {
        await itemToEdit.update({
          brand,
          category,
          sale_event_id: existingEvent.id,
          is_on_sale: true,
        });
      } else {
        // If no existing event, update the item without sale event
        await itemToEdit.update({
          brand,
          category,
          sale_event_id: null,
          is_on_sale: false,
        });
      }
    } else {
      // If brand or category is not changed, update the item without affecting sale event
      await itemToEdit.update({
        name,
        image_urls: imageUrlsArray.join('***'),
        price,
        ingredients,
        quantity,
        product_information,
        use_information,
        Barcode,
        Country,
        ProductionPlaces,
        Skin,
        Sex,
        Type,
      });
    }

    return res.status(200).json({ message: 'Item updated successfully', item: itemToEdit });
  } catch (error) {
    console.error('Error editing item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find the item to delete
    const itemToDelete = await db.Item.findByPk(itemId);

    if (!itemToDelete) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Remove the item's association with the sale event, but do not delete the sale event
    await itemToDelete.update({ sale_event_id: null, is_on_sale: false });

    // Delete the item
    await itemToDelete.destroy();

    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Get all orders with associated user information and totalAmount
    const orders = await db.Order.findAll({
      attributes: ["id", "user_id", "is_confirm", "total_amount", "createdAt", "dateConfirmed", "dateRejected"],
      include: [
        {
          model: db.User,
          attributes: ["username", "name", "phone_number", "address"],
        },
      ],
      group: ["Order.id", "User.id"], // Group by OrderId and UserId to avoid duplicates
    });

    // Map the result to the desired format
    const formattedOrders = orders.map((order) => {
      let status, date;

      switch (order.is_confirm) {
        case 0:
          status = "Not updated";
          dateCreated = order.createdAt;
          return {
            orderId: order.id,
            name: order.User.name,
            totalAmount: order.total_amount,
            status,
            dateCreated: dateCreated ? dateCreated.toLocaleDateString("en-GB") : null,
          };
        case 1:
          status = "Confirmed";
          dateConfirmed = order.dateConfirmed;
          dateCreated = order.createdAt;
          return {
            orderId: order.id,
            name: order.User.name,
            totalAmount: order.total_amount,
            status,
            dateConfirmed: dateConfirmed ? dateConfirmed.toLocaleDateString("en-GB") : null,
            dateCreated: dateCreated ? dateCreated.toLocaleDateString("en-GB") : null,
          };
        case 2:
          status = "Rejected";
          dateRejected = order.dateRejected;
          dateCreated = order.createdAt;
          return {
            orderId: order.id,
            name: order.User.name,
            totalAmount: order.total_amount,
            status,
            dateRejected: dateRejected ? dateRejected.toLocaleDateString("en-GB") : null,
            dateCreated: dateCreated ? dateCreated.toLocaleDateString("en-GB") : null,
          };
        default:
          status = "Invalid status";
          date = null;
      }
    });

    return res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error("Error getting orders: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const adminActivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user is already deactivated
    if (user.is_active == false) {
      return res.status(400).json({ message: "User is already deactivated." });
    }

    // Deactivate the user
    user.is_active = false;
    await user.save();

    return res
      .status(200)
      .json({ message: "User deactivated by admin successfully" });
  } catch (error) {
    console.error("Error deactivating user by admin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getItemsByCategory = async (req, res) => {
  try {
    const selectedAttributes = [
      "id",
      "name",
      "price",
      "image_urls",
      "quantity",
    ];

    // Fetch the items for the current page
    const items = await db.Item.findAll({
      attributes: selectedAttributes,
      where: {
        category: req.params.categoryName,
      },
    });

    const resultedItems = items.map((item) => {
      const imageUrlsArray = item.image_urls
        ? item.image_urls.split("***")
        : [];
      let firstImageUrl = imageUrlsArray[0];

      if (firstImageUrl && firstImageUrl.includes("promotions")) {
        firstImageUrl = imageUrlsArray[1] || null;
      }

      // Construct the result object
      const resultObject = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        first_image_url: firstImageUrl,
      };

      return resultObject;
    });

    return res.status(202).json({
      resultedItems,
    });
  } catch (error) {
    console.error("Error in getItemsByCategory:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllSaleEvents = async (req, res) => {
  try {
    // Retrieve all SaleEvents along with their associated items
    const saleEvents = await db.SaleEvent.findAll();

    // Format the SaleEvents data
    const formattedSaleEvents = saleEvents.map((saleEvent) => ({
      id: saleEvent.id,
      event_name: saleEvent.event_name,
      start_date: saleEvent.start_date,
      end_date: saleEvent.end_date,
      discount_percentage: saleEvent.discount_percentage,
      is_active: saleEvent.is_active,
      brand: saleEvent.brand,
      category: saleEvent.category,
    }));

    return res.status(200).json({
      saleEvents: formattedSaleEvents,
    });
  } catch (error) {
    console.error("Error in getAllSaleEvents:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateItemWithExistingSaleEvent = async (createdItem) => {
  try {
    const { brand, category } = createdItem;

    const existingEvent = await db.SaleEvent.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { brand: brand, is_active: true },
          { category: category, is_active: true },
        ],
        end_date: {
          [db.Sequelize.Op.gt]: new Date(),
        },
      },
    });

    if (existingEvent) {
      await createdItem.update({
        sale_event_id: existingEvent.id,
        is_on_sale: true,
      });

      await updateIsOnSaleStatus();
    }
  } catch (error) {
    console.error('Error updating item with existing sale event:', error);
  }
};

module.exports = {
  getAllUserAccounts,
  adminDeactivateUser,
  confirmOrder,
  rejectOrder,
  addItem,
  editItem,
  deleteItem,
  getAllOrders,
  adminActivateUser,
  getItemsByCategory,
  getAllSaleEvents,
};
