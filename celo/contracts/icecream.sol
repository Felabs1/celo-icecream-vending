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

    uint internal saleCount;
    uint internal stockCount;
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
        require(_volume > 0, "Volume must be greater than zero");
        require(_price > 0, "Price must be greater than zero");
        stockCount++;
        iceCreamsToSell[stockCount] = IcecreamToSell(_flavor, _volume, _price, false);
    }

    function refillIceCream(uint _id, uint _volume)public onlyOwner{
        require(_id <= stockCount, "Invalid ice cream ID");
        require(_volume > 0, "Volume must be greater than zero");
        iceCreamsToSell[_id].volume += _volume;
    }

    function editPrice(uint _id, uint _price) public onlyOwner{
        iceCreamsToSell[_id].price = _price;
    }

  function sellIcecream(uint _id, uint _quantity, string memory _customerName, uint _price, uint _total) public {
    require(iceCreamsToSell[_id].volume >= _quantity, "stock too low");
    
    uint volume = iceCreamsToSell[_id].volume;
    require(volume >= _quantity, "insufficient stock");

    uint newVolume = volume - _quantity;
    iceCreamsToSell[_id].volume = newVolume;

    saleCount++;
    string memory flavor = iceCreamsToSell[_id].flavor;
    sales[saleCount] = Sale(_customerName, flavor, _quantity, _price, _total, block.timestamp);
}


    function deleteIcecream(uint _id)public onlyOwner{
        iceCreamsToSell[_id].disabled = true;
    }

}