// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Token {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    uint256 public lockedAmount; // Số lượng token bị khóa
    bool public tokenLocked; // Cờ để kiểm tra trạng thái khóa token
    mapping(address => uint256) public balances;

    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
        lockedAmount = _initialSupply; // Số lượng token bị khóa ban đầu là toàn bộ totalSupply
        tokenLocked = true; // Ban đầu token bị khóa
    }


    function transfer(address _to, uint256 _amount) public {
        require(!tokenLocked, "Token is locked"); // Kiểm tra trạng thái khóa token
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function unlockToken() public {
        require(tokenLocked, "Token is already unlocked");
        tokenLocked = false; // Mở khóa token
        balances[msg.sender] -= lockedAmount; // Giảm số lượng token bị khóa từ tài khoản của người tạo
        balances[address(this)] += lockedAmount; // Tăng số lượng token bị khóa vào tài khoản Smart Contract
        lockedAmount = 0; // Đặt số lượng token bị khóa về 0
    }

    function distributeTokens(address[] memory _investors, uint256[] memory _amounts) public {
        require(!tokenLocked, "Token is locked");
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
        uint256 _tokenInitialSupply
    ) external {
        projectId++;

        // Deploy a new Token contract
        Token token = new Token(_tokenName, _tokenSymbol, _tokenInitialSupply);

        // Store the address of the Token contract in the project
        projects[projectId].createdBy = msg.sender;
        projects[projectId].token = token;
        projects[projectId].title = _title;
        projects[projectId].description = _description;
        projects[projectId].minContribute = _minContribute;
        projects[projectId].raiseTarget = _raiseTarget;

        // Emit the event with the project ID
        emit ProjectCreated(projectId);

        // Add the project ID to the projectIds array
        projectIds.push(projectId);
    }

    function getProjectIds() external view returns (uint256[] memory) {
        return projectIds;
    }

    function getProjectDetails(uint256 _projectId)
        external
        view
        returns (
            address,
            string memory,
            string memory,
            uint256,
            uint256,
            address[] memory,
            uint256,
            Token
        )
    {
        Project storage project = projects[_projectId];
        return (
            project.createdBy,
            project.title,
            project.description,
            project.minContribute,
            project.raiseTarget,
            project.contributorAddresses,
            project.totalContributedETH,
            project.token
        );
    }

    // Rest of the contract...
    function invest(uint256 _projectId) external payable {
        Project storage project = projects[_projectId];
        require(msg.value >= project.minContribute, "Contribution amount below minimum");

        // Update the contributor's contribution amount
        project.contributions[msg.sender] += msg.value;
        // Update the total contributed ETH
        project.totalContributedETH += msg.value;

        // Add the contributor's address to the list if it doesn't exist
        if (project.contributions[msg.sender] == 0) {
            project.contributorAddresses.push(msg.sender);
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
