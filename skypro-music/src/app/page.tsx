
import styles from "./page.module.css";

import Nav from "@/components/Nav/Nav";
import Centerblock from "@/components/Centerblock/Centerblock";
import Sidebar from "@/components/Sidebar/Sidebar";
import BarPlayer from "@/components/BarPlayer/Barplayer";
import { useState } from "react";
import { trackType } from "@/types";


export default function Home() {



  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <Centerblock />
          <Sidebar />
        </main>
        <BarPlayer />
        <footer className={styles.footer} />
      </div>
    </div>

  );
}
