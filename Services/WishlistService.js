import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { WishlistRepository } from "../Repository/WishlistRepository.js";
import { UserRepository } from "../Repository/UserRepository.js";

const createWishlist = async (data) => {
  try {
    const wishlist = await WishlistRepository.createWishlist(data);
    return wishlist;
  } catch (err) {
    throw err;
  }
};

const removeWishlist = async (data) => {
  try {
    const removedWishlist = await WishlistRepository.removeWishlist(data.id);
    return removedWishlist;
  } catch (err) {
    throw err;
  }
};

const getAllWishlist = async () => {
  try {
    const wishlists = await WishlistRepository.getAllWishlists();
    if (!wishlists) {
      throw new AppError("Couldn't get any wishlist", StatusCodes.NO_CONTENT);
    }
    return wishlists;
  } catch (err) {
    throw err;
  }
};

const getAllWishlistByUser = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail({ email: data.email });
    const wishlist = await WishlistRepository.getAllWishlistByUser({
      userId: user._id,
    });
    if (!wishlist) {
      throw new AppError(
        "Couldn't get any wishlist by the user",
        StatusCodes.NO_CONTENT
      );
    }
    return wishlist;
  } catch (err) {
    throw err;
  }
};

export const WishlistService = {
  createWishlist,
  removeWishlist,
  getAllWishlistByUser,
  getAllWishlist,
};
