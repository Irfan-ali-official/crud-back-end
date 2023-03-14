const User = require("../model/User");
const bcrypt = require("bcrypt");
const { validate } = require("../model/User");
const jwt = require("jsonwebtoken");
const home = async (req, res) => {
  const user = new User({
    icon: "",
    website: "",
  });
  try {
    await user.save();
  } catch (er) {
    console.log(err);
  }
};
const getAll = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};
const Delete = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await User.findByIdAndDelete(id);
  const users = await User.find();
  res.status(200).send(users);
};
const find = async (req, res) => {
  const users = await User.findById(req.params.id);
  res.status(200).send(users);
};
const Update = async (req, res) => {
  const { Username, Email, Password } = req.body;
  const { id } = req.params;
  console.log(Username + " " + id, "Heloo");
  await User.updateOne(
    { _id: id },
    { Username: Username, Email: Email, Password: Password }
  )
    .then(function () {
      res.status(200).json({ msg: "Updated" });
    })
    .catch(function (err) {
      res.status(401).json({ msg: "Not Updated" });
    });
  // res.status(200).json({
  //     msg:"Success"
  // })
};
const insert = async (req, res) => {
  const { Username, Email, Password } = req.body;
  console.log("insertion");
  await User.create({ Username, Email, Password }, (err, User) => {
    if (err) {
      res.status(401).send({ msg: "Not Found" });
    } else res.status(200).json({ msg: "Success" });
  });
};
const signin = async (req, res) => {
  const { Username, Password } = req.body;
  User.findOne({ Username: Username }, (err, user) => {
    if (user) {
      bcrypt.compare(Password, user.Password, (err, validate) => {
        if (validate) {
          const token = jwt.sign({ Username: user.Username }, "MYSECRETKEY", {
            expiresIn: 30 * 60,
          });
          res.json(token);
        } else {
          res.status(401).json({
            message: "no valid ",
          });
        }
      });
    }
  });
};
module.exports = { home, getAll, insert, Delete, find, Update, signin };
