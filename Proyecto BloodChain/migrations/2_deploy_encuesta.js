var Bloodchain = artifacts.require("./Bloodchain.sol");
module.exports = function(deployer) {
  deployer.deploy(Bloodchain);
};