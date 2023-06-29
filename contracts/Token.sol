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
