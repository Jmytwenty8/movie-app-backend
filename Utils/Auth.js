import bcrypt from "bcrypt";

export const comparePassword = async (databasePassword, suppliedPassword) => {
  try {
    return await bcrypt.compare(databasePassword, suppliedPassword);
  } catch (err) {
    console.error(err);
  }
};
