const {User} = require('../Models/User');

const mongoose= require('mongoose');


exports.FindByEmail = async(Email)=>{
    const user = User.findOne({email:Email});
    return user;
}

exports.FindById = async(id)=>{
    const user = User.findById(id);
    return user;
}

exports.createUser = async(user)=>{
    const newUser = await new User({...user}).save();
    return newUser;
}