// SPDX-License-Identifier: GPL-3.0

pragma solidity >0.4.1 < 0.9.0;
contract Icecream{
    address public owner;
    // Ice cream struct
    struct IcecreamToSell{
        string flavor;
        uint volume;
        uint price;
        bool disabled;
    }

    // sale struct
    struct Sale{
        string customerName;
        string flavor;
        uint quantity;
        uint price;
        uint total;
        uint timestamp;        
    }

    // upon deployment, the owner gets to be the same person that deployed the smart contract
    constructor() public{
        owner = msg.sender;
    }

    // state variable to track the salecount
    uint public saleCount;
    // state variable to track the stock count
    uint public stockCount;
    // mapping storage to store the icecreams to sell
    mapping(uint => IcecreamToSell) public iceCreamsToSell;
    // mapping storage to track every icecream that have been sold
    mapping(uint => Sale) public sales;


    // a modifier function thats restricts a method to be called by only the contract owner
    modifier onlyOwner {
        require(owner == msg.sender, "only owner can perform this");
        _;
    }

    function compareFlavors(string memory a, string memory b) public pure returns (bool) {
            return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    // function to add stock. 
    //only the contract owner can call that function
    function addStock(string memory _flavor, uint _volume, uint _price)public onlyOwner{
        stockCount++;
        iceCreamsToSell[stockCount] = IcecreamToSell(_flavor, _volume, _price, false);
    }

    // function to refill icecream
    // only the contract owner can refill the icecream
    function refillIceCream(uint _id, uint _volume)public onlyOwner{
        require(iceCreamsToSell[_id].disabled == false, "does not exist");
        iceCreamsToSell[_id].volume += _volume;
    }

    // this function edit's the price of a particular icecream flavor
    // only the person who deployed the contract can call the method
    function editPrice(uint _id, uint _price) public onlyOwner{
        require(iceCreamsToSell[_id].disabled == false, "does not exist");
        iceCreamsToSell[_id].price = _price;
    }

    // this function enables the user to sell the icecream
    function sellIcecream(uint _id, uint _quantity, string memory _customerName, uint _price, uint _total)public{
        // a require statement to ensure that the volume of 
        // the icecream is greater than or equal to the qunatity being bought
        require(iceCreamsToSell[_id].volume >= _quantity, "stock too low");
        /**
        a require statement to make sure that no one is selling a deleted or an inexisting icrcream */
        require(iceCreamsToSell[_id].disabled == false, "does not exist");
        saleCount++;
        string memory flavor = iceCreamsToSell[_id].flavor;
        uint volume = iceCreamsToSell[_id].volume;
        uint newVolume = volume - _quantity;
        iceCreamsToSell[_id].volume = newVolume;
        sales[saleCount] = Sale(_customerName, flavor, _quantity, _price, _total, block.timestamp);
    }

    // to achieve the goal of immutability on the blockchain,
    // instead of deleting ,we just render the product as disabled...
    function deleteIcecream(uint _id)public onlyOwner{
        require(iceCreamsToSell[_id].disabled == false, "does not exist");
        iceCreamsToSell[_id].disabled = true;
    }

}
