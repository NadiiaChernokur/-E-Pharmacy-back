import { Order } from "../db/orders.js";
import { Products } from "../db/products.js";
import { User } from "../db/user.js";
import HttpError from "../helpers/HttpError.js";
import RegisterHttpError from "../helpers/RegisterHttpError.js";
import { orderSchema } from "../schemas/orderSchemas.js";

export const addToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId, quantity } = req.body;

    const product = await Products.findById(productId);
    if (!product) {
      throw HttpError(404, "Product not found");
    }

    const cartItemIndex = user.cart.findIndex((item) =>
      item.productId.equals(productId)
    );
    if (cartItemIndex >= 0) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    next(error);
  }
};
export const addToOrders = async (req, res, next) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) throw RegisterHttpError(error);
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json("Order successfully added");
  } catch (error) {
    next(error);
  }
};
