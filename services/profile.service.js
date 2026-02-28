const UserInfo = require("../models/userInfoModel");

const getProfileService = async (id) => {
  const userinfo = await UserInfo.findOne({ user: id });
  if (!userInfo) throw new Error("Failed to get User Profile Information");
  return userinfo;
};

const updateProfileService = async (id, data) => {
  const updateProfile = await UserInfo.findOneAndUpdate(
    { user: id },
    { $set: data },
    { runValidators: true },
  );

  if (!updateProfile) throw new Error("Failed to update User Profile");
};
module.exports = { getProfileService, updateProfileService };
