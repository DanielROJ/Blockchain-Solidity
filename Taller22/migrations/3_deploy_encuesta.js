var EncuestaLite = artifacts.require("./EncuestaLite.sol");
module.exports = function(deployer) {
  deployer.deploy(EncuestaLite);
};