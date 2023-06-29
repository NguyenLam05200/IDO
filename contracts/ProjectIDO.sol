// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract ProjectIDO { 
    struct Project {
        Token token;
        uint256 raiseTarget;
        address[] contributorAddresses; // Store the addresses of contributors
        mapping(address => uint256) contributions; // Store the contribution amounts
        uint256 totalContributedETH;
    }

    mapping(uint256 => Project) public projects;
    uint256 public projectId;

    function createProject(string memory _name, string memory _symbol, uint256 _initialSupply, uint256 _raiseTarget) external {
        projectId++;
        
        // Deploy a new Token contract
        Token token = new Token(_name, _symbol, _initialSupply);
        
        // Store the address of the Token contract in the project
        projects[projectId].token = token;
        projects[projectId].raiseTarget = _raiseTarget;
    }

    function contribute(uint256 _projectId) external payable {
        require(msg.value > 0, "Contribution amount must be greater than 0");

        Project storage project = projects[_projectId];
        require(address(project.token) != address(0), "Invalid project");

        // Store the contributor's address if it's not already stored
        if (project.contributions[msg.sender] == 0) {
            project.contributorAddresses.push(msg.sender);
        }

        // Add the contribution to the contributor's total
        project.contributions[msg.sender] += msg.value;
        project.totalContributedETH += msg.value;
    }

    function distributeTokens(uint256 _projectId, uint256 _supplyToken) external {
        Project storage project = projects[_projectId];
        require(address(project.token) != address(0), "Invalid project");
        require(project.totalContributedETH >= project.raiseTarget, "Project not completed yet");

        Token token = project.token;

        // Iterate over the contributor addresses array to distribute tokens
        for (uint256 i = 0; i < project.contributorAddresses.length; i++) {
            address contributor = project.contributorAddresses[i];
            uint256 contribution = project.contributions[contributor];

            // Calculate the token amount based on the contribution ratio
            uint256 tokenAmount = (contribution * _supplyToken) / project.totalContributedETH;

            // Transfer tokens from the Token contract to the contributor's address
            token.transfer(contributor, tokenAmount);
        }
    }
}
