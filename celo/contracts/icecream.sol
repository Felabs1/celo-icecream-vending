pragma solidity ^0.8.0;

/**
 * @title Icecream Contract
 * @dev A contract for selling ice cream on the Celo blockchain.
 */
contract Icecream {
    address public owner;

    struct IcecreamOffer {
        string flavor;
        uint256 volume;
        uint256 price;
        bool disabled;
    }

    struct Sale {
        string customerName;
        string flavor;
        uint256 quantity;
        uint256 price;
        uint256 total;
        uint256 timestamp;
    }

    uint256 public saleCount;
    uint256 public stockCount;
    mapping(uint256 => IcecreamOffer) public iceCreamsToSell;
    mapping(uint256 => Sale) public sales;

    /**
     * @dev Modifier to restrict a function to the contract owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    /**
     * @dev Constructor function.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Compares two strings.
     * @param a The first string.
     * @param b The second string.
     * @return Whether the two strings are equal.
     */
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(bytes(a)) == keccak256(bytes(b)));
    }

    /**
     * @dev Adds stock of ice cream.
     * @param _flavor The flavor of the ice cream.
     * @param _volume The volume of the ice cream.
     * @param _price The price of the ice cream.
     */
    function addStock(string memory _flavor, uint256 _volume, uint256 _price) public onlyOwner {
        stockCount++;
        iceCreamsToSell[stockCount] = IcecreamOffer(_flavor, _volume, _price, false);
    }

    /**
     * @dev Refills the stock of a specific ice cream.
     * @param _id The ID of the ice cream.
     * @param _volume The additional volume to add.
     */
    function refillIceCream(uint256 _id, uint256 _volume) public onlyOwner {
        iceCreamsToSell[_id].volume += _volume;
    }

    /**
     * @dev Edits the price of a specific ice cream.
     * @param _id The ID of the ice cream.
     * @param _price The new price of the ice cream.
     */
    function editPrice(uint256 _id, uint256 _price) public onlyOwner {
        iceCreamsToSell[_id].price = _price;
    }

    /**
     * @dev Sells ice cream to a customer.
     * @param _id The ID of the ice cream.
     * @param _quantity The quantity to sell.
     * @param _customerName The name of the customer.
     * @param _price The price per unit of ice cream.
     * @param _total The total price of the sale.
     */
    function sellIceCream(
        uint256 _id,
        uint256 _quantity,
        string memory _customerName,
        uint256 _price,
        uint256 _total
    ) public {
        require(iceCreamsToSell[_id].volume >= _quantity, "Stock too low");

        saleCount++;
        string memory flavor = iceCreamsToSell[_id].flavor;
        uint256 volume = iceCreamsToSell[_id].volume;
        uint256 newVolume = volume - _quantity;
        iceCreamsTosell[_id].volume = newVolume;
        sales[saleCount] = Sale(_customerName, flavor, _quantity, _price, _total, block.timestamp);
    }

    /**
     * @dev Disables an ice cream offer.
     * @param _id The ID of the ice cream offer to disable.
     */
    function disableIceCream(uint256 _id) public onlyOwner {
        iceCreamsToSell[_id].disabled = true;
    }
}

