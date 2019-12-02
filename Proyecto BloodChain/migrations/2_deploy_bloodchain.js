var BloodChain = artifacts.require("./BloodChain.sol");
module.exports = function(deployer) {
  deployer.deploy(BloodChain);
};