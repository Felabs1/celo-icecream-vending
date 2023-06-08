const icecream = artifacts.require("Icecream");

module.exports = function (deployer) {
  deployer.deploy(icecream);
};
