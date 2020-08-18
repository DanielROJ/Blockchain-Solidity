pragma solidity >=0.4.22 <0.7.0;

import  "./ownable.sol";

contract MessageStore is  Ownable{
    

    string private message;
    
   
    
    function setMessage(string memory newMessage) public payable{
        require(msg.value == 3 ether);
        message = newMessage;
    }
    
    function getMessage() public view returns(string memory resultMessage){
        return message;
    }
    
   function getBalance() public view returns (uint  value){
       return address(this).balance;
   }
   
   
   function getBalanceInEther() public view returns(uint valueEhter){
       return getBalance()/1e18;
   }
}
