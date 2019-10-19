var EstacionGas = artifacts.require("./EstacionGas.sol");
module.exports = function(deployer) {
  deployer.deploy(EstacionGas,"initial name from chain");
};

