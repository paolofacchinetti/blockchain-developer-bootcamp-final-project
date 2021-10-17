var EtherGovernance = artifacts.require("./EtherGovernance.sol");

module.exports = function(deployer) {
    deployer.deploy(EtherGovernance, "1000000000000000000"); // initialize constructor with _proposalCreationRequirement = 1 ETH
};