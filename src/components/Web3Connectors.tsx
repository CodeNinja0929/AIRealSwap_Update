import styles from '../styles/Connectors.module.css';
import { connectors, getConnectorName, Web3Connector } from '../connectors';
import { useCallback } from 'react';

function Connector({ web3Connector }: { web3Connector: Web3Connector }) {
  const [connector, hooks] = web3Connector;
  const isActive = hooks.useIsActive();
  const onClick = useCallback(() => {
    if (isActive) {
      connector.deactivate();
    } else {
      connectors.forEach(([connector]) => connector.deactivate());
      connector.activate();
    }
  }, [connector, isActive]);

  return (
    <div className={`${styles.connector} ${isActive ? styles.activeConnector : ''}`}>
      <label className={styles.label} style={{paddingRight: "10px"}}>{getConnectorName(connector)}</label>
      <button className={styles.button} onClick={onClick}>{isActive ? 'Disconnect' : 'Connect'}</button>
      <svg className={`${styles.status} ${isActive ? styles.active : ''}`} viewBox="0 0 2 2"  style={{paddingLeft: "5px"}}>
        <circle cx={1} cy={1} r={1}/>
      </svg>
    </div>
  );
}

export default function Connectors() {
  return (
    <div className={styles.connectors}>
      {connectors.map((web3Connector, index) => (
        <Connector key={index} web3Connector={web3Connector} />
      ))}
    </div>
  );
}
