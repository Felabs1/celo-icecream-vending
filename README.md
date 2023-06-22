# celo-icecream-vending

This is a bare minimum to implement an ice cream vending system on the celo blockchain.
We assume that the Dapp is running on a private network of a local icecream vending company
A user connects his celo extension wallet to log in after which he is redirected to the dashboard in the dashboard we have the menu

## The Dashboard

The dashboard displays analysed data for daily and annual sales. it also tracks analysed data for the daily customers

## Add variety

This module allows a user to add a flavour, delete, and change the flavour volume remaining and the pricing... only the contract owner gets to perform these contract changes

## Make sales

anybody that is logged in can make the sales. this dapp assumes that it is working in an ice cream vending company

# live link

https://celo-icecream-vending.vercel.app/

## Installation Requirements

- Nodejs
- Ganache
- Celo Extension Wallet

## Installation Instructions

- clone the repository
- run `npm install`
- run `npm run dev`

## Ganache

- once your ganache is installed, install truffle by running
  `npm install -g truffle`
- in your repo change directory to celo,
  run `npm install` then run `truffle deploy --network development` or `truffle migrate --reset`
  Your smart contract is now deployed locally and all you need to do is replace the contract address to use the dapp locally
### The Dashboard
![Screenshot (12)](https://github.com/Felabs1/celo-icecream-vending/assets/92982964/08c464e0-e9c0-44ab-af9c-4dd8fe535d93)
The dashboard gives you analysed figures of the sales made in the last 24 hours and in the last 12 months. it also gives out the percentage profits and the percentage losses where possible
### The Variety Section if you are the contract owner
![Screenshot (14)](https://github.com/Felabs1/celo-icecream-vending/assets/92982964/59cf9905-25c3-4d08-a311-c257c7b1cb35)
If you are the contract owner, you can add a new flavor, edit and delete it
### The variety section if you are not the contract owner
![Screenshot (20)](https://github.com/Felabs1/celo-icecream-vending/assets/92982964/ca81ebb2-e060-4637-8960-251e66d6fed7)
if you are not the contract owner, you are only limited to viewing this page. you are not allowed to make any changes to  the dapp
### The sales section
![Screenshot (15)](https://github.com/Felabs1/celo-icecream-vending/assets/92982964/b430dc65-3e81-442a-9f86-690207b4255d)
anybody connected to the dapp can make sales. 

## further improvements

- Making the smart contract to accept only specific accounts to make contract calls otherwise the other accounts are only allowed to view.
