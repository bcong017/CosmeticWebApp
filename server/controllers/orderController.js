const db = require("../models");
const jwt = require('jsonwebtoken');

const createOrder = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const tokenParts = token.split(" ", 2);

      try {
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
          throw new Error("Invalid token format");
        }

        const decoded = jwt.verify(tokenParts[1], "UserSecretKey");
        // Attach the decoded user information to the request object
        req.user = decoded;
      } catch (error) {
        // Handle token verification errors
        console.error("Token verification error:", error);
      }
    }

    const user_id = req.user.userId;
    const selectedAttributes = ["id", "name", "price", "is_on_sale"];

    const cartItems = await db.Cart.findAll({
      where: { user_id },
      include: [
        {
          model: db.Item,
          as: "Item",
          attributes: selectedAttributes,
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
    const shippingFee = 0.1 * totalAmount;

    const order = await db.Order.create({
      user_id: user_id,
      order_date: new Date(),
      total_amount: totalAmount,
      shipping_fee: shippingFee,
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
