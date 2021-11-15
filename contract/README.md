# CONTRACT DEPLOYED

<a href="https://kovan.etherscan.io/address/0x7486adbcB0d1779916928dd52d0815AF4f118825#code">https://kovan.etherscan.io/address/0x7486adbcB0d1779916928dd52d0815AF4f118825#code</a>

# INSTALL DEPENDENCIES

```shell
git clone https://github.com/grape404/RCB-BlockchainAus.git
```

Enter into the the main folder.

```shell
npm install
```

# RUN TEST LOCALLY

```shell
npx hardhat test
```

# CONFIGURE THE DEPLOYMENT

In this project, copy the .env.template file to a file named .env, and then edit it to fill in the details. Enter your Etherscan, Polygonscan API key, your Rinkeby and Matic node URL (eg from Alchemy or Infura), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

Adjust the contract deployment settings!
<b>scripts/deploy.js</b>

To get the Etherscan and Polygonscan API key, go to
<a href="https://etherscan.io/myapikey"> https://etherscan.io/myapikey</a>
<br>
<a href="https://polygonscan.com/myapikey">https://polygonscan.com/myapikey</a>

# DEPLOY ON TESTNET

```shell
npx hardhat run --network kovan scripts/deploy.js
```

# TOKEN ADDRESS

0xDdf7f8858E6b817C744A1AB78ed7aeE40368BC76
