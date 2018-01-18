var _ = require("lodash");
var skills = require ('./skills.json')
var users = require("../models/user.js");
var jwt = require('jsonwebtoken');
var config = require("../../config/index.js");

getSkills = (req, res) => {
    res.json(skills);
}

findUserByName = (userName) => {
    return users[_.findIndex(users, {name: userName})];
}

findUserById = (payloadId) => {
    return users[_.findIndex(users, {id: payloadId})];
}

getJwtToken = (payload) => {
    return jwt.sign(payload, config.jwtOptions.secretOrKey);
}


module.exports = {getSkills,findUserByName,findUserById,getJwtToken};