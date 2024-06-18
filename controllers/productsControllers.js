import { Products } from "../db/products.js";
import HttpError from "../helpers/HttpError.js";

export const getProducts = async (req, res, nex) => {
  try {
    const { category, keyword, limit = 12, page = 1 } = req.query;
    let query = {};

    if (category && category.trim() !== "") {
      query.category = category;
    }

    if (keyword && keyword.trim() !== "") {
      query.name = { $regex: keyword, $options: "i" };
    }
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);

    const products = await Products.find(query)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    res.status(200).json(products);
  } catch (error) {
    res.json(HttpError(404));
  }
};

export const getProductToId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id);
    if (!product) {
      return next(HttpError(404, "Product not found"));
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
export const getProductsCategory = async (req, res, next) => {
  try {
    const products = await Products.find();
    const categoryArray = [...new Set(products.map((item) => item.category))];

    res.status(200).json(categoryArray);
  } catch (error) {
    next(error);
  }
};
