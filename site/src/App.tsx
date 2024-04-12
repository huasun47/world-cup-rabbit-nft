import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useLocalStorage } from 'react-use-storage'
import { Web3Modal } from '@web3modal/react'


const Main = lazy(() => import("@/views"));
const Home = lazy(() => import("@/views/home"));
const Mint = lazy(() => import("@/views/mint"));

function App() {

  const [connected] = useLocalStorage('wagmi.connected')

  return (
    <>
      <HashRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="mint" element={<Mint />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
      <Web3Modal
        config={{
          projectId: '6df9a97487cdf38cd1596296f813ec08',
          theme: 'light',
          accentColor: 'default',
          ethereum: {
            appName: 'rabbit',
            autoConnect: !!connected,
          }
        }}
      />
    </>
  );
}

export default App;
