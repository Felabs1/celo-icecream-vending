Icecream
A smart contract for managing an ice cream shop.

Contract
Icecream : contracts/dum.sol

A smart contract for managing an ice cream shop.

Modifiers:
onlyOwner
modifier onlyOwner()
Functions:
constructor
constructor() public
compareFlavors
function compareFlavors(string a, string b) public pure returns (bool)
Compares two strings for equality.

Parameters
Name	Type	Description
a	string	The first string.
b	string	The second string.
Return Values
Name	Type	Description
[0]	bool	true if the strings are equal, false otherwise.
addStock
function addStock(string _flavor, uint256 _volume, uint256 _price) public
Adds stock of ice cream with the specified flavor, volume, and price.

Parameters
Name	Type	Description
_flavor	string	The flavor of the ice cream.
_volume	uint256	The volume of the ice cream stock to add.
_price	uint256	The price of the ice cream.
refillIceCream
function refillIceCream(uint256 _id, uint256 _volume) public
Refills the stock of the specified ice cream with the given volume.

Parameters
Name	Type	Description
_id	uint256	The ID of the ice cream.
_volume	uint256	The volume to add to the ice cream stock.
editPrice
function editPrice(uint256 _id, uint256 _price) public
Edits the price of the specified ice cream.

Parameters
Name	Type	Description
_id	uint256	The ID of the ice cream.
_price	uint256	The new price for the ice cream.
sellIcecream
function sellIcecream(uint256 _id, uint256 _quantity, string _customerName, uint256 _price, uint256 _total) public
Sells ice cream to a customer.

Parameters
Name	Type	Description
_id	uint256	The ID of the ice cream to sell.
_quantity	uint256	The quantity of ice cream to sell.
_customerName	string	The name of the customer.
_price	uint256	The price per unit of ice cream.
_total	uint256	The total price for the ice cream sale.
deleteIcecream
function deleteIcecream(uint256 _id) public
Deletes the specified ice cream from the stock.

Parameters
Name	Type	Description
_id	uint256	The ID of the ice cream to delete.
Events:
StockAdded
event StockAdded(uint256 id, string flavor, uint256 volume, uint256 price)
IcecreamRefilled
event IcecreamRefilled(uint256 id, uint256 volume)
PriceEdited
event PriceEdited(uint256 id, uint256 price)
IcecreamSold
event IcecreamSold(uint256 id, string flavor, string customerName, uint256 quantity, uint256 price, uint256 total, uint256 timestamp)
IcecreamDeleted
event IcecreamDeleted(uint256 id)
