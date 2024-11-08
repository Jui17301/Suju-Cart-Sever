/* eslint-disable @typescript-eslint/no-explicit-any */

import { TProduct } from './products.interface';
import { Product } from './products.model';

interface ProductFilter {
  category?: string;
}

const creatProductIntoDb = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getProductIntoDb = async (filter: ProductFilter) => {
  // Create a query object that excludes deleted items
  const query: any = { isDeleted: false };

  // If a category is provided, add it to the query
  if (filter.category) {
    query.category = filter.category;
  }

  // Fetch products from the database based on the query
  const result = await Product.find(query).select('-isDeleted'); // Exclude isDeleted field in results
  return result;
};

const getSingleProductIntoDb = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const SelRevenuIntoDb = async () => {
  const products = await Product.find({ isDeleted: false });
  const revenuePerProduct = products.map((product) => product.price - 100); // Adjust logic as necessary
  console.log(revenuePerProduct);
  return revenuePerProduct;
};

const updateProductIntoDb = async (id: string, payload: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductIntoDb = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const ProductService = {
  creatProductIntoDb,
  updateProductIntoDb,
  deleteProductIntoDb,
  getProductIntoDb,
  getSingleProductIntoDb,
  SelRevenuIntoDb,
};
