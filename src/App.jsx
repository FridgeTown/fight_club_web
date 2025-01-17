import { Outlet } from "react-router";

import styles from './App.module.css'
import DarkmodeButton from "./darkmode/DarkmodeButton";

function App() {

  return (
    <main className={styles.main}>
      <DarkmodeButton />
      <Outlet />
    </main>
  )
}

export default App
