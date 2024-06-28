import { useCallback, useEffect, useRef, useState } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { SupportedLocale, SUPPORTED_LOCALES, SwapWidget } from '@uniswap/widgets';
import { TOKEN_LIST } from '../token_list';

import '@uniswap/widgets/fonts.css';

import { useActiveProvider } from '../connectors';
import { JSON_RPC_URL } from '../constants';
import DocumentationCards from './DocumentationCards';
import Web3Connectors from './Web3Connectors';
import styles from '../styles/Home.module.css';

const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
const AIRM = "0xf250b1f6193941bb8bff4152d719edf1a59c0e69";

function generateRandomValue() {
  return (Math.random() * (0.5 - 0.3) + 0.3).toFixed(3);
}

function generateRandomInterval() {
  return Math.random() * (10000 - 2000) + 1000; // Random interval between 2000ms and 5000ms
}

export default function App() {
  const connectors = useRef<HTMLDivElement>(null);
  const focusConnectors = useCallback(() => connectors.current?.focus(), []);

  const provider = useActiveProvider();

  const [locale, setLocale] = useState<SupportedLocale>('en-US');
  const onSelectLocale = useCallback((e) => setLocale(e.target.value), []);

  const [aiValue, setAiValue] = useState(generateRandomValue);

  useEffect(() => {
    const updateValue = () => {
      setAiValue(generateRandomValue());
      clearInterval(interval);
      interval = setInterval(updateValue, generateRandomInterval());
    };

    let interval = setInterval(updateValue, generateRandomInterval());
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="/assets/logo.png" alt="Logo" className={styles.logo} />
          <div className={styles.logoText}>AI REALM</div>
        </div>
        <div className={styles.i18n}>
          <FiGlobe />
          <select onChange={onSelectLocale} className={styles.select}>
            {SUPPORTED_LOCALES.map((locale) => (
              <option key={locale} value={locale}>
                {locale}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>AI REALM Swap</h1>

        <div className={styles.demoContainer}>
          <div className={styles.demo}>
            <div className={styles.connectors} ref={connectors} tabIndex={-1}>
              <Web3Connectors />
            </div>

            <div className={styles.widget}>
              <SwapWidget
                jsonRpcEndpoint={JSON_RPC_URL}
                tokenList={TOKEN_LIST}
                provider={provider}
                locale={locale}
                onConnectWallet={focusConnectors}
                defaultInputTokenAddress="NATIVE"
                defaultInputAmount="1"
                defaultOutputTokenAddress={AIRM}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.aiValueContainer}>
          <h2 className={styles.aiValueTitle}>AI Calculated Slippage Value</h2>
          <div className={styles.aiValue}>{aiValue}%</div>
        </div>
      </footer>
    </div>
  );
}
