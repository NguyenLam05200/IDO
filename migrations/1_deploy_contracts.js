const SimpleStorage = artifacts.require("SimpleStorage");
const Token = artifacts.require("Token");
const ProjectIDO = artifacts.require("ProjectIDO");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  // deployer.deploy(Token);
  // deployer.link(Token, ProjectIDO);
  deployer.deploy(ProjectIDO);
};
