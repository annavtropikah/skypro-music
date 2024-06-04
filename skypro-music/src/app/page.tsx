
import styles from "./page.module.css";

import Nav from "@/components/Nav/Nav";

import Sidebar from "@/components/Sidebar/Sidebar";
import BarPlayer from "@/components/BarPlayer/Barplayer";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
        
          <Sidebar />
        </main>
        <BarPlayer />
        <footer className={styles.footer} />
      </div>
    </div>

  )
}
