import styles from './App.module.css';
import { Flags } from './components/Flags';
function App() {
  return (<>
    <div className={styles.app}>
      <Flags />
    </div>
    </>
  );
}

export default App;
