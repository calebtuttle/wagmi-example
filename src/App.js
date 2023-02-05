import { createClient, Provider } from 'wagmi';
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import './App.css';
import AccountGate from './AccountGate';

const wagmiClient = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    return [
      new MetaMaskConnector({}),
    ];
  },
});

function App() {
  return (
    <Provider client={wagmiClient}>
      <div className="App">
        <AccountGate />
      </div>
    </Provider>
  );
}

export default App;
