const db = require("../models");

const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cartItems = await db.Cart.findAll({
      where: { user_id: userId },
      include: [{ model: db.Item, as: "Item" }],
    });

    if (!cartItems || cartItems.length === 0) {
      return res
        .status(404)
        .json({ error: "No items found in the user's cart" });
    }

    const order = await db.Order.create({
      user_id: userId,
      order_date: new Date(),
      total_amount: calculateTotalAmount(cartItems),
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
    return res
      .status(201)
      .json({ message: "Order created successfully", orderId: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

function calculateTotalAmount(cartItems) {
    return cartItems.reduce((total, cartItem) => {
      const itemPrice = cartItem.Item.sale_event_id ? calculateDiscountedPrice(cartItem.Item) : cartItem.Item.price;
      return total + itemPrice * cartItem.quantity;
    }, 0);
  }
  
  function calculateDiscountedPrice(item) {
    const discountedPrice = (item.price * item.SaleEvent.discount_percentage) / 100;
    return Math.max(0, item.price - discountedPrice);
  }

  module.exports= {
    createOrder
  }