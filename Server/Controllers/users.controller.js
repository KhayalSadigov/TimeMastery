let Users = require("./../Models/users.model");
const bcrypt = require("bcrypt");

const userController = {
  login : async (req,res) =>{
    console.log(req.body)
    try {
      let user = await Users.findOne({username:req.body.username})
      let match = await bcrypt.compare(req.body.password,user.password)
        if(match){
          res.send({
            status : true ,
            data : user,
            mess : ""
          })
        }
        else{
          res.send({
            status : false ,
            mess : "Password is not correct!"
          })
        }
      
    } catch (error) {
      res.send({
        status : false ,
        mess : "User not found!"
      })
    }
  },
  getAll: async (req, res) => {
    try {
      let data = await Users.find({});
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  getOne: async (req, res) => {
    try {
      let { id } = req.params;
      let data = await Users.findById(id);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  post: async (req, res) => {
    try {
      let newData = new Users(req.body);
      bcrypt.hash(newData.password, 10, function (err, hash) {
        newData.password = hash;
        newData.save();
        res.send(newData);
      });
    } catch (error) {
      res.send(error);
    }
  },
  delete: async (req, res) => {
    try {
      let data = await Users.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  update: async (req, res) => {
    try {
      let data = await Users.findByIdAndUpdate(req.params.id, req.body);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = userController;
