const {
  getProfileService,
  updateProfileService,
} = require("../services/profile.service");

const getProfileInfo = async (req, res) => {
  try {
    const id = req.user.id;
    const userInfo = await getProfileService(id);

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfileInfo = async (req, res) => {
  try {
    const { id } = req.user.id;
    const { data } = req.body;
    const userInfo = await updateProfileService(id, data);

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getProfileInfo,
  updateProfileInfo,
};
