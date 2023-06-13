// SPDX-License-Identifier: GPL-3.0

pragma solidity >0.4.1 < 0.9.0;
contract Icecream{
    address owner;
    struct IcecreamToSell{
        string flavor;
        uint volume;
        uint price;
        bool disabled;
    }

    struct Sale{
        string customerName;
        string flavor;
        uint quantity;
        uint price;
        uint total;
        uint timestamp;        
    }

    constructor() public{
        owner = msg.sender;
    }

    uint public saleCount;
    uint public stockCount;
    mapping(uint => IcecreamToSell) public iceCreamsToSell;
    mapping(uint => Sale) public sales;


    modifier onlyOwner {
        require(owner == msg.sender, "only owner can perform this");
        _;
    }

    function compareFlavors(string memory a, string memory b) public pure returns (bool) {
            return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    function addStock(string memory _flavor, uint _volume, uint _price)public onlyOwner{
        stockCount++;
        iceCreamsToSell[stockCount] = IcecreamToSell(_flavor, _volume, _price, false);
    }

    function refillIceCream(uint _id, uint _volume)public onlyOwner{
        iceCreamsToSell[_id].volume += _volume;
    }

    function editPrice(uint _id, uint _price) public onlyOwner{
        iceCreamsToSell[_id].price = _price;
    }

    function sellIcecream(uint _id, uint _quantity, string memory _customerName, uint _price, uint _total)public{
        require(iceCreamsToSell[_id].volume >= _quantity, "stock too low");
        saleCount++;
        string memory flavor = iceCreamsToSell[_id].flavor;
        uint volume = iceCreamsToSell[_id].volume;
        uint newVolume = volume - _quantity;
        iceCreamsToSell[_id].volume = newVolume;
        sales[saleCount] = Sale(_customerName, flavor, _quantity, _price, _total, block.timestamp);
    }

    function deleteIcecream(uint _id)public onlyOwner{
        iceCreamsToSell[_id].disabled = true;
    }

}
