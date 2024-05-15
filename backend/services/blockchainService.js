const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, '..', '..', 'blockchain', 'network', 'test-network', 'connection-org1.json');
const walletPath = path.join(process.cwd(), 'wallet');

const initializeBlockchain = async () => {
  try {
    // Load the network configuration
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
      console.log('An identity for the user "appUser" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('secured_asset_transfer');

    return contract;
  } catch (error) {
    console.error(`Failed to initialize blockchain: ${error}`);
    process.exit(1);
  }
};

const submitTransaction = async (contract, transactionName, ...args) => {
  try {
    const result = await contract.submitTransaction(transactionName, ...args);
    console.log(`Transaction ${transactionName} has been submitted`);
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    throw new Error(error);
  }
};

const evaluateTransaction = async (contract, transactionName, ...args) => {
  try {
    const result = await contract.evaluateTransaction(transactionName, ...args);
    console.log(`Transaction ${transactionName} has been evaluated`);
    return result;
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  initializeBlockchain,
  submitTransaction,
  evaluateTransaction,
};
