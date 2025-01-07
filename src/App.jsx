import { Outlet } from "react-router";

import styles from './App.module.css'
import Footer from './common/component/Footer';
import DarkmodeButton from "./darkmode/DarkmodeButton";

function App() {

  return (
    <>
      <DarkmodeButton />
      <main className={styles.main}>
        <Outlet />
        <Footer />
      </main>
    </>
  )
}

export default App
