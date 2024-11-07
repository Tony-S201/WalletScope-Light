const Token = require('../models/Token');

async function getTokens(req, res) {
  try {
    const tokens = await Token.find();
    res.status(200).json(tokens);
  } catch(error) {
    console.error("Error during token fetch");
    res.status(500).json({ message: "Error during fetch all tokens" });
  }
}

async function registerToken(req, res) {

}

async function getTokenById(req, res) {

}

async function editToken(req, res) {

}

module.exports = {
  getTokens,
  registerToken,
  getTokenById,
  editToken
}