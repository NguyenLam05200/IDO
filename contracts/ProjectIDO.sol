// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    uint256 public totalSupply;
    uint256 public lockedAmount; // Số lượng token bị khóa
    mapping(address => uint256) public balances;

    struct TokenMetadata {
        string name;
        string symbol;
        string image; // Trường lưu trữ đường dẫn hoặc mã hash của ảnh
    }

    TokenMetadata public metadata;

    constructor(string memory _name, string memory _symbol, uint256 _initialSupply, string memory _image) {
        metadata = TokenMetadata({
            name: _name,
            symbol: _symbol,
            image: _image
        });
        // ...
        balances[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
        lockedAmount = _initialSupply; // Số lượng token bị khóa ban đầu là toàn bộ totalSupply
    }

    function getMetadata() public view returns (string memory, string memory, string memory) {
        return (metadata.name, metadata.symbol, metadata.image);
    }

    function transfer(address _to, uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function distributeTokens(address[] memory _investors, uint256[] memory _amounts) public {
        require(_investors.length == _amounts.length, "Invalid input");

        for (uint256 i = 0; i < _investors.length; i++) {
            address investor = _investors[i];
            uint256 amount = _amounts[i];

            require(balances[address(this)] >= amount, "Insufficient balance");
            balances[address(this)] -= amount;
            balances[investor] += amount;
        }
    }
}

contract ProjectIDO {
    struct WithdrawalRequest {
        address requester;     // Address of the requester
        uint256 amount;        // Amount of ETH requested for withdrawal
        string reason;         // Reason for the withdrawal
        uint256 timestamp;   // Timestamp when the request was made
        // bytes32 transactionHash; // Transaction hash of the withdrawal
    }

    struct Project {
        bool isCompleted;
        Token token;
        address createdBy;
        string title;
        string description;
        uint256 minContribute;
        uint256 raiseTarget;
        address[] contributorAddresses; // Store the addresses of contributors
        mapping(address => uint256) contributions; // Store the contribution amounts
        uint256 totalContributedETH;
        WithdrawalRequest[] withdrawalRequests;
    }

    mapping(uint256 => Project) public projects;
    uint256[] public projectIds; // Store the IDs of all projects
    uint256 public projectId;
    event ProjectCreated(uint256 projectId); // Declare the event

    function createProject(
        string memory _title,
        string memory _description,
        uint256 _minContribute,
        uint256 _raiseTarget,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _tokenInitialSupply,
        string memory _tokenImage
    ) external {
        projectId++;

        // Deploy a new Token contract
        Token token = new Token(_tokenName, _tokenSymbol, _tokenInitialSupply, _tokenImage);

        // Store the address of the Token contract in the project
        projects[projectId].createdBy = msg.sender;
        projects[projectId].token = token;
        projects[projectId].title = _title;
        projects[projectId].description = _description;
        projects[projectId].minContribute = _minContribute;
        projects[projectId].raiseTarget = _raiseTarget;
        projects[projectId].isCompleted = false;

        // Emit the event with the project ID
        emit ProjectCreated(projectId);

        // Add the project ID to the projectIds array
        projectIds.push(projectId);
    }

    function getProjectIds() external view returns (uint256[] memory) {
        return projectIds;
    }

    struct ProjectDetails {
        address createdBy;
        string title;
        string description;
        uint256 minContribute;
        uint256 raiseTarget;
        address[] contributorAddresses;
        uint256 totalContributedETH;
        Token token;
        string tokenName;
        string tokenSymbol;
        string tokenImage;
        bool isCompleted;
    }

    function getProjectDetails(uint256 _projectId)
        external
        view
        returns (ProjectDetails memory)
    {
        Project storage project = projects[_projectId];
        Token token = project.token;
        (string memory name, string memory symbol, string memory image) = token.getMetadata();

        ProjectDetails memory details;
        details.createdBy = project.createdBy;
        details.title = project.title;
        details.description = project.description;
        details.minContribute = project.minContribute;
        details.raiseTarget = project.raiseTarget;
        details.contributorAddresses = project.contributorAddresses;
        details.totalContributedETH = project.totalContributedETH;
        details.token = project.token;
        details.tokenName = name;
        details.tokenSymbol = symbol;
        details.tokenImage = image;
        details.isCompleted = project.isCompleted;

        return details;
    }

    function invest(uint256 _projectId) external payable {
        Project storage project = projects[_projectId];
        require(msg.sender != project.createdBy, "Project creator cannot invest");
        require(msg.value >= project.minContribute, "Contribution amount below minimum");
        require(project.contributions[msg.sender] == 0, "Address has already invested");
        require(project.totalContributedETH < project.raiseTarget, "Project already complete");

        // Update the contributor's contribution amount
        project.contributions[msg.sender] += msg.value;
        // Update the total contributed ETH
        project.totalContributedETH += msg.value;

        // Add the contributor's address to the list if it doesn't exist
        project.contributorAddresses.push(msg.sender);

        // Check if the raise target is reached
        if (project.totalContributedETH >= project.raiseTarget) {
            project.isCompleted = true; // Set the project as completed
            distributeLockedTokens(_projectId);
        }
    }

    function distributeLockedTokens(uint256 _projectId) internal {
        Project storage project = projects[_projectId];
        require(project.contributorAddresses.length > 0, "No contributors");

        // Get the Token contract address from the project
        Token token = project.token;

        // Get the lockedAmount from the Token contract
        uint256 lockedAmount = token.lockedAmount();

        // Calculate the token distribution per contributor
        uint256 tokensToDistribute = lockedAmount / project.contributorAddresses.length;

        // Distribute tokens to each contributor
        for (uint256 i = 0; i < project.contributorAddresses.length; i++) {
            address contributor = project.contributorAddresses[i];
            token.transfer(contributor, tokensToDistribute);
        }
    }

    function withdrawFunds(uint256 _projectId, uint256 _amount, string memory _reason) external {
        Project storage project = projects[_projectId];
        require(project.createdBy == msg.sender, "Only project creator can withdraw funds");
        require(project.totalContributedETH >= _amount, "Insufficient funds");

        // Create a new withdrawal request
        WithdrawalRequest memory request = WithdrawalRequest({
            requester: msg.sender,
            amount: _amount,
            reason: _reason,
            timestamp: block.timestamp
            // transactionHash: bytes32(0) // Initialize with zero
        });

        // Add the withdrawal request to the corresponding project
        project.withdrawalRequests.push(request);

        payable(msg.sender).transfer(_amount);
        project.totalContributedETH -= _amount;
    }

    function getWithdrawalRequests(uint256 _projectId) external view returns (WithdrawalRequest[] memory) {
        return projects[_projectId].withdrawalRequests;
    }
}
