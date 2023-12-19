const { Cart, Item } = require("../models");

const addItemToCart = async (req, res) => {
  try {
    // Get item details from the request
    const { item_id, quantity } = req.body;

    // Check if the item exists
    const item = await Item.findByPk(item_id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const user = req.user;
    const userId = user.userId;

    // Check if the user is authenticated
    const user_id = req.user ? userId : null;

    const existingCartItem = await Cart.findOne({
      where: { user_id, item_id },
    });

    if (existingCartItem) {
      // Check if adding the quantity exceeds the available quantity of the item
      if (existingCartItem.quantity + quantity > item.quantity) {
        return res
          .status(400)
          .json({ error: "Quantity exceeds available stock" });
      }

      // Update the quantity if the item is already in the cart
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      // Check if adding the quantity exceeds the available quantity of the item
      if (quantity > item.quantity) {
        return res
          .status(400)
          .json({ error: "Quantity exceeds available stock" });
      }

      // Create a new cart item if it doesn't exist
      await Cart.create({
        user_id,
        item_id,
        quantity,
      });
    }

    return res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding item to cart: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const mergeCarts = async (req, res) => {
  try {
    // Check if the user is authenticated
    const user_id = req.user ? req.user.id : null;

    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    // Get items from the non-authenticated user's cart
    const nonAuthCartItems = await Cart.findAll({
      where: { user_id: null }, // Change this to the non-authenticated user's identifier
    });

    // Move items to the authenticated user's cart
    for (const nonAuthCartItem of nonAuthCartItems) {
      await nonAuthCartItem.update({ user_id });
    }

    return res.status(200).json({ message: "Carts merged successfully" });
  } catch (error) {
    console.error("Error merging carts: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const editCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    // Check if the cart item exists
    const cartItem = await Cart.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Check if the new quantity exceeds the available stock of the item
    const item = await Item.findByPk(cartItem.item_id);
    if (quantity > item.quantity) {
      return res
        .status(400)
        .json({ error: "Quantity exceeds available stock" });
    }

    // Update the quantity of the cart item
    cartItem.quantity = quantity;
    await cartItem.save();

    return res
      .status(200)
      .json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    console.error("Error editing cart item quantity: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    // Check if the cart item exists
    const cartItem = await Cart.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Remove the cart item
    await cartItem.destroy();

    return res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error("Error removing cart item: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getItemsInCart = async (req, res) => {
  try {

    const user = req.user;
    const userId = user.userId;

    // Check if the user is authenticated
    const user_id = req.user ? userId : null;

    if (!user_id) {
      return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    // Get items in the user's cart with additional details
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [
        {
          model: Item,
          attributes: ['name', 'price', 'image_urls', 'quantity'], // Add other attributes as needed
        },
      ],
    });

    // Format the response
    const formattedCartItems = cartItems.map((cartItem) => {
      const item = cartItem.Item;
      const imageUrlsArray = item.image_urls ? item.image_urls.split('***') : [];
      
      // Skip the first image if it contains "promotions"
      let firstImageUrl = imageUrlsArray[0];
      if (firstImageUrl && firstImageUrl.includes("promotions")) {
        firstImageUrl = imageUrlsArray[1] || null;
      }

      return {
        id: cartItem.id,
        item: {
          name: item.name,
          price: item.price,
          image_url: firstImageUrl, // Show only one image_url
        },
        quantity: cartItem.quantity,
      };
    });

    return res.status(200).json({ cartItems: formattedCartItems });
  } catch (error) {
    console.error('Error getting items in cart: ', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addItemToCart,
  mergeCarts,
  editCartItemQuantity,
  removeCartItem,
  getItemsInCart
};