import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, resp: Response) => {
  try {
    const products = await Product.findAll({
      order: [["price", "DESC"]],
      // limit: 2
      attributes: {exclude: ["createdAt", "updatedAt"]},
    });
    resp.json({ data: products });
  }
  catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error" });
  }
}

export const getProductById = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return resp.status(404).json({ error: "Product not found" });
    }
    resp.json({ data: product });
  }
  catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error" });
  }
}

export const createProduct = async (req: Request, resp: Response) => {
  try {
    const product = await Product.create(req.body);
    resp.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return resp.status(404).json({ error: "Product not found" });
    }
    await product.update(req.body);
    resp.json({ data: product });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error" });
  }
}

export const updateAvailability = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return resp.status(404).json({ error: "Product not found" });
    }
    product.availability = !product.dataValues.availability;
    await product.save();

    console.log(product.dataValues)
    resp.json({ data: product });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error" });
  }
}

export const deleteProduct = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return resp.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    resp.json({ data: 'Producto eliminado' });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error" });
  }
}