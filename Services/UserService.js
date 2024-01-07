import { StatusCodes } from "http-status-codes";
import { comparePassword, createToken } from "../Utils/Auth.js";
import { AppError } from "../Utils/AppError.js";
import { UserRepository } from "../Repository/UserRepository.js";
import { hashPassword } from "../Utils/HashPassword.js";
import { BookingRepository } from "../Repository/BookingRepository.js";
import { WishlistRepository } from "../Repository/WishlistRepository.js";
import { ReviewRepository } from "../Repository/ReviewRepository.js";
import { transporter } from "../index.js";
import { serverConfigs } from "../Configs/server-config.js";

const signIn = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail(data);
    if (!user) {
      throw new AppError("Couldn't find the user", StatusCodes.BAD_REQUEST);
    }
    if (!(await comparePassword(data.password, user.password))) {
      throw new AppError("Password Incorrect", StatusCodes.BAD_REQUEST);
    }
    return user.toObject();
  } catch (err) {
    throw err;
  }
};

const getUser = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail(data);
    if (!user) {
      throw new AppError("Couldn't find the user", StatusCodes.BAD_REQUEST);
    } else {
      return user.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const signUp = async (data) => {
  try {
    const user = await UserRepository.createUser(data);
    return user.toObject();
  } catch (err) {
    throw err;
  }
};

const forgetPassword = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail(data);
    if (!user) {
      throw new AppError("Couldn't find the user", StatusCodes.BAD_REQUEST);
    }
    const token = await createToken(user.email);
    const message = `${serverConfigs.URL}/user/${token}`;
    const mailDetails = {
      from: serverConfigs.MAIL,
      to: user.email,
      subject: "Reset Password",
      text: message,
    };
    await transporter.sendMail(mailDetails);
  } catch (err) {
    throw err;
  }
};

const removeUser = async (data) => {
  try {
    const allBookingData = await BookingRepository.getAllBookings();
    allBookingData.map(async (booking) => {
      if (booking.userId.equals(data.id)) {
        await BookingRepository.removeBooking({ id: booking._id });
      }
    });
    const allWishlistData = await WishlistRepository.getAllWishlists();
    allWishlistData.map(async (wishlist) => {
      if (wishlist.userId.equals(data.id)) {
        await WishlistRepository.removeWishlist(wishlist._id);
      }
    });
    const allReviewData = await ReviewRepository.getAllReviews();
    allReviewData.map(async (review) => {
      if (review.userId.equals(data.id)) {
        await ReviewRepository.removeReview(review._id);
      }
    });
    const response = await UserRepository.removeUser(data.id);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const patchUser = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail({ email: data.email });
    if (!user) {
      throw new AppError("Couldn't find the user", StatusCodes.BAD_REQUEST);
    } else {
      if (data.password) {
        data.password = await hashPassword(data.password);
      }
      const response = await UserRepository.patchUser(
        { email: user.email },
        data
      );
      return response.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const updateUser = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail({ email: data.email });
    if (!user) {
      throw new AppError("Couldn't find the user", StatusCodes.BAD_REQUEST);
    } else {
      if (data.password) {
        data.password = await hashPassword(data.password);
      }
      const response = await UserRepository.updateUser(
        { email: user.email },
        data
      );
      return response.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await UserRepository.getAllUsers();
    if (!allUsers) {
      throw new AppError("Couldn't find users", StatusCodes.BAD_REQUEST);
    }
    return allUsers;
  } catch (err) {
    throw err;
  }
};

export const getUserById = async (data) => {
  try {
    const user = await UserRepository.getUserById(data.id);
    if (!user) {
      throw new AppError("Couldn't find user", StatusCodes.NOT_FOUND);
    }
    return user;
  } catch (err) {
    throw err;
  }
};
export const UserService = {
  signIn,
  signUp,
  removeUser,
  updateUser,
  patchUser,
  getUser,
  getAllUsers,
  getUserById,
  forgetPassword,
};
