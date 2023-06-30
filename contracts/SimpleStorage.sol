// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract SimpleStorage {
	uint256 number;
    string public test;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num, string memory _test) public {
        number += num;
        test = _test;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256, string memory){
        return (number, test);
    }
}
