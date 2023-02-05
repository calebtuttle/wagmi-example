import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClient, Provider, useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import './App.css';

const queryClient = new QueryClient();

const wagmiClient = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    return [
      new MetaMaskConnector({}),
    ];
  },
});

function AccountGate({ children }) {
  const { data: account } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    console.log('account at time', Date.now(), account);
  }, [account])

  return (
    <QueryClientProvider client={queryClient}>
      <Provider client={wagmiClient}>
        <div className="App">
          <header className="App-header">
            <button onClick={() => connect(connectors?.[0])}>Connect wallet</button>
            {account?.address && account.connector ? (
              <>
                <div>
                  Address: {account?.address}
                </div>
                <div>
                  {children}
                </div>
              </>
            ) : (
              <>
                <p>
                  Please connect wallet
                </p>
              </>
            )}
          </header>
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default AccountGate;
