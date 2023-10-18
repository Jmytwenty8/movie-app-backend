import { wishlists } from "../Models/Wishlists.js";

const getAllWishlists = async () => {
  try {
    const allWishlists = await wishlists.find({});
    return allWishlists;
  } catch (err) {
    throw err;
  }
};

const getWishlistById = async (id) => {
  try {
    const wishlist = await wishlists.findById(id);
    return wishlist;
  } catch (err) {
    throw err;
  }
};

const createWishlist = async (data) => {
  try {
    const wishlist = await wishlists.create(data);
    return wishlist;
  } catch (err) {
    throw err;
  }
};

const removeWishlist = async (id) => {
  try {
    const removedWishlist = await wishlists.findByIdAndDelete(id);
    return removedWishlist;
  } catch (err) {
    throw err;
  }
};

const getAllWishlistByUser = async (data) => {
  try {
    const wishlist = await wishlists.find({ userId: data.userId });
    return wishlist;
  } catch (err) {
    throw err;
  }
};

const updateWishlist = async (wishlist, data) => {
  try {
    const newWishlist = await wishlists.findOneAndUpdate(wishlist, data);
    return newWishlist;
  } catch (err) {
    throw err;
  }
};

export const WishlistRepository = {
  getAllWishlists,
  getWishlistById,
  createWishlist,
  removeWishlist,
  updateWishlist,
  getAllWishlistByUser,
};
