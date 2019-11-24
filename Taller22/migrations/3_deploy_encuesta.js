var EEncuesta = artifacts.require("./EEncuesta.sol");
module.exports = function(deployer) {
  deployer.deploy(EEncuesta);
};