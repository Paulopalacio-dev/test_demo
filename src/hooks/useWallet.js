import { useState } from 'react';
import { ethers } from 'ethers';

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [network, setNetwork] = useState('');

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const address = accounts[0];
        setWalletAddress(address);
        console.log('Wallet connected:', address);
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const balanceWei = await provider.getBalance(address);
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setBalance(balanceEth);
        console.log('Wallet Balance:', balanceEth, 'ETH');
        
        const net = await provider.getNetwork();
        setNetwork(net.chainId);
        console.log('Network (Chain ID):', net.chainId);
        
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log('MetaMask not found');
    }
  };

  return { connectWallet, walletAddress, balance, network };
};
