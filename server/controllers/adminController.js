// controllers/adminController.js
const db = require("../models");

const getAllUserAccounts = async (req, res) => {
    try {
  
      // Get all user accounts
      const users = await db.User.findAll({
        attributes: ['id', 'username', 'name', 'phone_number', 'address', 'is_active'],
      });
  
      return res.status(200).json({ users });
    } catch (error) {
      console.error('Error getting user accounts: ', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const adminDeactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user is already deactivated
    if (user.is_active == false) {
      return res.status(400).json({ message: 'User is already deactivated.' });
    }

    // Deactivate the user
    user.is_active = false;
    await user.save();

    return res.status(200).json({ message: 'User deactivated by admin successfully' });
  } catch (error) {
    console.error('Error deactivating user by admin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order
    const order = await db.Order.findByPk(orderId, {
      include: [
        {
          model: db.OrderItem,
          include: [{ model: db.Item }],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Calculate total amount of money
    const totalAmountOfMoney = order.OrderItems.reduce((total, orderItem) => {
      return total + orderItem.Item.price * orderItem.quantity;
    }, 0);

    // Calculate shipping fee (5% of total amount)
    const shippingFee = 0.05 * totalAmountOfMoney;

    // Calculate money needed to pay
    const moneyNeedToPay = totalAmountOfMoney + shippingFee;

    // Create a new Receipt
    const receipt = await db.Receipt.create({
      order_id: orderId,
      payment_method: 'YourPaymentMethod', // Set the actual payment method
      ship_fee: shippingFee,
    });

    // Update the Order (mark it as confirmed)
    await order.update({ is_confirm: 1 });

    // Create Profit Statistics for each item in the order
    await Promise.all(
      order.OrderItems.map(async (orderItem) => {
        const item = orderItem.Item;
        const costPrice = 0.2 * item.price; // 20% as the cost of item
        const profit = item.price - costPrice;

        await db.ProfitStatistics.create({
          item_id: item.id,
          sale_date: new Date(),
          sale_price: item.price,
          cost_price: costPrice,
          profit: profit,
        });
      })
    );

    return res.status(200).json({ message: 'Order confirmed successfully' });
  } catch (error) {
    console.error('Error confirming order:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const rejectOrder = async (req,res) =>{
  try {
    const { orderId } = req.params;
    const order = await db.Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.is_confirm) {
      return res.status(400).json({ error: 'Cannot decline a confirmed order' });
    }

    // Return items to the cart
    const orderItems = await db.OrderItem.findAll({ where: { order_id: orderId } });
    await Promise.all(
      orderItems.map(async (orderItem) => {
        await db.Cart.create({
          user_id: order.user_id,
          item_id: orderItem.item_id,
          quantity: orderItem.quantity,
        });

        // Remove order item after returning to the cart
        await orderItem.destroy();
      })
    );

    // Delete the declined order
    await order.destroy();

    return res.status(200).json({ message: 'Order declined successfully' });
  } catch (error) {
    console.error('Error declining order:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  
  }
}

const addItem = async (req, res) => {
  try {
    const {
      image_urls,
      name,
      price,
      brand,
      category,
      ingredients,
      quantity,
      product_information,
      use_information,
      specifications,
    } = req.body;

    // Split image_urls into an array of links using comma and space as separators
    const imageUrlsArray = image_urls.split(', ').map(link => link.trim());

    // Check if there is a sale event for the given category or brand
    const saleEvent = await db.SaleEvent.findOne({
      attributes: ["id", "brand", "category", "discount_percentage", "start_date", "end_date"],
      where: {
        is_active: true,
        [db.Sequelize.Op.or]: [
          { brand: brand || null },
          { category: category || null },
        ],
      },
    });

    // Create a new item
    const newItem = await db.Item.create({
      image_urls: imageUrlsArray.join('***'), // Rejoin the links to store in the database
      name,
      price,
      brand,
      category,
      ingredients,
      quantity,
      product_information,
      use_information,
      specifications: JSON.stringify(specifications),
      sale_event_id: saleEvent ? saleEvent.id : null,
      is_on_sale: saleEvent ? true : false,
    });

    return res.status(201).json({ message: 'Item added successfully', newItem });
  } catch (error) {
    console.error('Error adding item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const {
      image_urls,
      name,
      price,
      brand,
      category,
      ingredients,
      quantity,
      product_information,
      use_information,
      specifications,
    } = req.body;

    // Split image_urls into an array of links using comma and space as separators
    const imageUrlsArray = image_urls.split(', ').map(link => link.trim());

    // Update the item and include the SaleEvent
    const [updatedRowCount, [updatedItem]] = await db.Item.update(
      {
        image_urls: imageUrlsArray.join('***'), // Rejoin the links to store in the database
        name,
        price,
        brand,
        category,
        ingredients,
        quantity,
        product_information,
        use_information,
        specifications: JSON.stringify(specifications),
      },
      {
        where: { id: itemId },
        returning: true,
        include: [
          {
            model: db.SaleEvent,
            attributes: ["id", "brand", "category", "discount_percentage", "start_date", "end_date"],
            where: {
              is_active: true,
            },
            required: false,
          },
        ],
      }
    );

    // Update is_on_sale status and associate the item with the sale event
    if (updatedItem && updatedItem.SaleEvent) {
      const isBrandMatch = !brand || updatedItem.brand === updatedItem.SaleEvent.brand;
      const isCategoryMatch = !category || updatedItem.category === updatedItem.SaleEvent.category;

      if (isBrandMatch || isCategoryMatch) {
        await updatedItem.update({ sale_event_id: updatedItem.SaleEvent.id, is_on_sale: true });
      }
    }

    return res.status(200).json({ message: 'Item updated successfully', updatedItem });
  } catch (error) {
    console.error('Error editing item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // Delete the item
    await db.Item.destroy({ where: { id: itemId } });

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
      attributes: ['id', 'user_id', 'is_confirm', 'total_amount'], 
      include: [
        {
          model: db.User,
          attributes: ['username', 'name', 'phone_number', 'address'],
        },
      ],
      group: ['Order.id', 'User.id'], // Group by OrderId and UserId to avoid duplicates
    });

    // Map the result to the desired format
    const formattedOrders = orders.map(order => ({
      orderId: order.id,
      userName: order.User.username, 
      totalAmount: order.total_amount,
      is_confirm: order.is_confirm
    }));

    return res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error('Error getting orders: ', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllUserAccounts, adminDeactivateUser, confirmOrder, rejectOrder, addItem, editItem, deleteItem, getAllOrders };
