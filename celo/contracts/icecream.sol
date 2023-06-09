 // SPDX-License-Identifier: GPL-3.0

pragma solidity >0.4.1 < 0.9.0;

/**

@title Icecream

@dev A smart contract for managing an ice cream shop.

*/

contract Icecream{

    address public owner;

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

    constructor(){

        owner = msg.sender;

    }

    uint public saleCount = 0;

    uint public stockCount = 0;

    mapping(uint => IcecreamToSell) public iceCreamsToSell;

    mapping(uint => Sale) public sales;

    event StockAdded(uint indexed id, string flavor, uint volume, uint price);

    event IcecreamRefilled(uint indexed id, uint volume);

    event PriceEdited(uint indexed id, uint price);

    event IcecreamSold(uint indexed id, string flavor, string customerName, uint quantity, uint price, uint total, uint timestamp);

    event IcecreamDeleted(uint indexed id);

    modifier onlyOwner {

        require(owner == msg.sender, "only owner can perform this");

        _;

    }

      /**

       * @dev Compares two strings for equality.

       * @param a The first string.

       * @param b The second string.

       * @return true if the strings are equal, false otherwise.

       */

    function compareFlavors(string memory a, string memory b) public pure returns (bool) {

            return keccak256(bytes(a)) == keccak256(bytes(b));

    }

    /**

     * @dev Adds stock of ice cream with the specified flavor, volume, and price.

      * @param _flavor The flavor of the ice cream.

       * @param _volume The volume of the ice cream stock to add.

        * @param _price The price of the ice cream.

         */

    function addStock(string memory _flavor, uint _volume, uint _price)public onlyOwner{

        require(bytes(_flavor).length > 0, "Flavor cannot be empty.");

        require(_volume > 0, "Volume must be greater than zero.");

        require(_price > 0, "Price must be greater than zero.");

        stockCount++;

        iceCreamsToSell[stockCount] = IcecreamToSell(_flavor, _volume, _price, false);

        emit StockAdded(stockCount, _flavor, _volume, _price);

    }

    

    /**

     * @dev Refills the stock of the specified ice cream with the given volume.

      * @param _id The ID of the ice cream.

       * @param _volume The volume to add to the ice cream stock.

        */

    function refillIceCream(uint _id, uint _volume)public onlyOwner{

        require(_id > 0 && _id <= stockCount, "Invalid ID.");

        require(_volume > 0, "Volume must be greater than zero.");

        iceCreamsToSell[_id].volume += _volume;

        emit IcecreamRefilled(_id, _volume);

    }

    /**

     * @dev Edits the price of the specified ice cream.

      * @param _id The ID of the ice cream.

       * @param _price The new price for the ice cream.

        */

    function editPrice(uint _id, uint _price) public onlyOwner{

        require(_id > 0 && _id <= stockCount, "Invalid ID.");

        require(_price > 0, "Price must be greater than zero.");

        iceCreamsToSell[_id].price = _price;

        emit PriceEdited(_id, _price);

    }

    /**

     * @dev Sells ice cream to a customer.

      * @param _id The ID of the ice cream to sell.

       * @param _quantity The quantity of ice cream to sell.

        * @param _customerName The name of the customer.

         * @param _price The price per unit of ice cream.

          * @param _total The total price for the ice cream sale.

           */

    function sellIcecream(uint _id, uint _quantity, string memory _customerName, uint _price, uint _total)public{

        require(iceCreamsToSell[_id].volume >= _quantity, "stock too low");

        require(_id > 0 && _id <= stockCount, "Invalid ID.");

        require(_quantity > 0, "Quantity must be greater than zero.");

        require(bytes(_customerName).length > 0, "Customer name cannot be empty.");

        require(_price > 0, "Price must be greater than zero.");

        require(_total > 0, "Total must be greater than zero.");

        saleCount++;

        string memory flavor = iceCreamsToSell[_id].flavor;

        uint volume = iceCreamsToSell[_id].volume;

        uint newVolume = volume - _quantity;

        iceCreamsToSell[_id].volume = newVolume;

        sales[saleCount] = Sale(_customerName, flavor, _quantity, _price, _total, block.timestamp);

        emit IcecreamSold(saleCount, flavor, _customerName, _quantity, _price, _total, block.timestamp);

    }

    /**

     * @dev Deletes the specified ice cream from the stock.

      * @param _id The ID of the ice cream to delete.

       */

    function deleteIcecream(uint _id)public onlyOwner{

        require(_id > 0 && _id <= stockCount, "Invalid ID.");

        iceCreamsToSell[_id].disabled = true;

        emit IcecreamDeleted(_id);

    }

}
