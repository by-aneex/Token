// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TRC20Token
 * @dev Implementation of the TRC-20 token standard for TRON blockchain
 */

interface ITRC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract TRC20Token is ITRC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    uint256 private _totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals;
    
    /**
     * @dev Sets the values for {name}, {symbol}, {decimals}, and {totalSupply}
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        _totalSupply = _initialSupply * 10 ** uint256(_decimals);
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
    
    /**
     * @dev Returns the total supply of the token
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
    
    /**
     * @dev Returns the balance of the given account
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    
    /**
     * @dev Transfers tokens from the caller to a recipient
     */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(recipient != address(0), "TRC20: transfer to the zero address");
        require(_balances[msg.sender] >= amount, "TRC20: insufficient balance");
        
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
    
    /**
     * @dev Approves a spender to spend tokens on behalf of the caller
     */
    function approve(address spender, uint256 amount) public override returns (bool) {
        require(spender != address(0), "TRC20: approve to the zero address");
        
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    /**
     * @dev Returns the allowance of a spender to spend tokens on behalf of the owner
     */
    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }
    
    /**
     * @dev Transfers tokens from a sender to a recipient using the allowance mechanism
     */
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(sender != address(0), "TRC20: transfer from the zero address");
        require(recipient != address(0), "TRC20: transfer to the zero address");
        require(_balances[sender] >= amount, "TRC20: insufficient balance");
        require(_allowances[sender][msg.sender] >= amount, "TRC20: insufficient allowance");
        
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        _allowances[sender][msg.sender] -= amount;
        
        emit Transfer(sender, recipient, amount);
        return true;
    }
    
    /**
     * @dev Increases the allowance of a spender
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        require(spender != address(0), "TRC20: increase allowance to the zero address");
        _allowances[msg.sender][spender] += addedValue;
        emit Approval(msg.sender, spender, _allowances[msg.sender][spender]);
        return true;
    }
    
    /**
     * @dev Decreases the allowance of a spender
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        require(spender != address(0), "TRC20: decrease allowance to the zero address");
        require(_allowances[msg.sender][spender] >= subtractedValue, "TRC20: decreased allowance below zero");
        _allowances[msg.sender][spender] -= subtractedValue;
        emit Approval(msg.sender, spender, _allowances[msg.sender][spender]);
        return true;
    }
}
