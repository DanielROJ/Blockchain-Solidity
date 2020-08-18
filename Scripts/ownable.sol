pragma solidity >=0.4.22 <0.7.0;

contract Ownable{
    
    
    address private owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    
    modifier isOwner() {
        require(owner == msg.sender);
        _;
        
    }
    
}
