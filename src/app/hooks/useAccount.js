import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Web3ModalSetup } from '../helpers';
import { useUserProviderAndSigner } from 'eth-hooks';
import { ENVIRONMENT } from '../constants';
import useStaticJsonRPC from './useStaticJsonRPC';

const web3Modal = Web3ModalSetup();
const USE_BURNER_WALLET = false;

export const useAccount = () => {
  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();

  const localProvider = useStaticJsonRPC([ENVIRONMENT.jsonRpcUrl]);
  const { signer } = useUserProviderAndSigner(injectedProvider, localProvider, USE_BURNER_WALLET);

  const logoutOfWeb3Modal = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect === 'function') {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }, [injectedProvider]);

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));
    const updateProvider = chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    };

    provider.on('chainChanged', updateProvider);
    provider.on('accountsChanged', updateProvider);

    provider.on('disconnect', (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
  }, [logoutOfWeb3Modal]);

  async function getAddress() {
    if (signer) {
      const newAddress = await signer.getAddress();
      setAddress(newAddress);
    }
  }

  useEffect(() => {
    if (!address) {
      loadWeb3Modal();
    }
  }, [address]);

  useEffect(() => {
    getAddress();
  }, [signer]);

  return {
    localProvider,
    injectedProvider,
    address,
    logoutOfWeb3Modal,
    loadWeb3Modal,
    signer,
    web3Modal,
    getAddress,
  };
};
