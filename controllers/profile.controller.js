const UserInfo = require("../models/userInfoModel");

const getProfileInfo = async (req, res) => {
  console.log("userid:1 ", req.user.id);
  try {
    const userInfo = await UserInfo.findOne({ user: req.user.id });
    if (!userInfo) {
      throw new Error("Error");
    }
    res.json(userInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfileInfo = async (req, res) => {
  try {
    const userInfo = await UserInfo.findOneAndUpdate(
      { user: req.user.id },
      {
        ...req.body,
      },
    );

    // if (!userInfo) {
    //   res.status(400).json({ error: "No user found" });
    // }

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ error: "No user found" });
  }
};
module.exports = {
  getProfileInfo,
  updateProfileInfo,
};
