const db = require("../models");

const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const selectedAttributes = ["id", "name", "price", "is_on_sale"];

    const cartItems = await db.Cart.findAll({
      where: { user_id: userId },
      include: [
        {
          model: db.Item,
          as: "Item",
          attributes: selectedAttributes, // Add the attributes you need
          include: [
            {
              model: db.SaleEvent,
              attributes: ["discount_percentage", "start_date", "end_date"],
              where: {
                is_active: true,
              },
              required: false,
            },
          ],
        },
      ],
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ error: "No items found in the user's cart" });
    }

    // Calculate total amount asynchronously
    const totalAmount = await calculateTotalAmount(cartItems);

    const order = await db.Order.create({
      user_id: userId,
      order_date: new Date(),
      total_amount: totalAmount,
    });

    await Promise.all(
      cartItems.map(async (cartItem) => {
        const { item_id, quantity } = cartItem;
        await db.OrderItem.create({
          order_id: order.id,
          item_id,
          quantity,
        });

        await cartItem.destroy();
      })
    );

    return res.status(201).json({ message: "Order created successfully", orderId: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

async function calculateTotalAmount(cartItems) {
  let total = 0;

  for (const cartItem of cartItems) {
    const item = cartItem.Item;
    const itemPrice = await calculateDiscountedPrice(item);
    total += itemPrice * cartItem.quantity;
  }

  return total;
}

async function calculateDiscountedPrice(item) {
  let finalPrice = item.price; // Default to item price

  if (item.is_on_sale) {
    const currentDate = new Date();
    const startDate = new Date(item.SaleEvent.start_date);
    const endDate = new Date(item.SaleEvent.end_date);

    if (startDate <= currentDate && currentDate <= endDate) {
      // Calculate the discounted price
      const discountedPrice = (item.price * item.SaleEvent.discount_percentage) / 100;
      finalPrice = Math.max(0, item.price - discountedPrice);
    }
  }

  return finalPrice;
}

module.exports = {
  createOrder,
};
