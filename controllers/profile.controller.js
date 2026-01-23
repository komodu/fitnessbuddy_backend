const UserInfo = require("../models/userInfoModel");

const getProfileInfo = async (req, res) => {
  console.log("userid:1 ", req.user.userId);
  try {
    const userInfo = await UserInfo.findOne({ user: req.user.userId });
    if (!userInfo) {
      throw new Error("Error");
    }
    res.json(userInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfileInfo = async (req, res) => {
  const { id } = req.params;

  const userInfo = await UserInfo.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
  );

  if (!userInfo) {
    res.status(400).json({ error: "No user found" });
  }

  res.status(200).json(userInfo);
};
module.exports = {
  getProfileInfo,
  updateProfileInfo,
};
