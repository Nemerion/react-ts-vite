import Logo from "@/assets/logo.png";
import ChuckGenerator from "@/components/ChuckGenerator/ChuckGenerator";
import HelloWorld from "@/components/HelloWorld/HelloWorld";
import UseHooksTest from "@/components/useHooksTest/useHooksTest";

import styles from "./App.module.css";

export default function App() {
  return (
    <main className={styles.main}>
      <img className={styles.logo} alt="React logo" width="400px" src={Logo} />
      <HelloWorld msg="Hello React + TypeScript + Vite" />
      <ChuckGenerator />
      <UseHooksTest />
    </main>
  );
}
