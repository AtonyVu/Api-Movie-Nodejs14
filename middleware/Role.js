const User = require("../models/UserModel");
module.exports = async function (req, res, next) {
  const { user } = req;
  console.log(user);
  const typeUser = await User.findOne({ _id: user.id });
  if (typeUser.type == "ADMIN") {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "Bạn không đủ quyền truy cập, truy cập bị từ chối!" });
  }
};
