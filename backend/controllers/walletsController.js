const Wallet = require('../models/Wallet');

async function getWallets(req, res) {
  try {
    const wallets = await Wallet.find();
    res.status(200).json(wallets);
  } catch(error) {
    console.error("Error during wallet fetch");
    res.status(500).json({ message: "Error during fetch all wallets" });
  }
}

async function registerWallet(req, res) {
  const value  = req.body;

  try {
    const wallet = new Wallet(value);
    await wallet.save();
    res.status(201).json({ message: "Wallet successfully registered", item: wallet });
  } catch(error) {
    console.error("Error during the wallet registration");
    res.status(500).json({ message: "Error during wallet registration" });
  }
}

async function getWalletById(req, res) {
  const { id } = req.params;

  try {
    const wallet = await Wallet.findById(id);
    res.status(200).json(wallet);
  } catch(error) {
    console.error("Error during get wallet by id");
    res.status(500).json({ message: "Error during get wallet by id" + id });
  }
}

module.exports = {
  getWallets,
  registerWallet,
  getWalletById,
}