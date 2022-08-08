import { ethers } from "ethers";

export const parseAndCommify = (value, nrOfDecimals = 2) => {
  return ethers.utils.commify(parseFloat(value).toFixed(nrOfDecimals));
};

export const ipfsToURL = (ipfsAddress) => {
  return "https://ipfs.io/" + ipfsAddress.replace("://", "/");
};

export const getENSFromAddress = async (walletAddress) => {
  let name = null;
  try {
    const provider = new ethers.providers.EtherscanProvider();
    name = await provider.lookupAddress(walletAddress);
  } catch (err) {
    console.log(err);
  }
  return name;
};
