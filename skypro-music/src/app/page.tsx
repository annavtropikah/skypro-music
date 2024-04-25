'use client'
import styles from "./page.module.css";

import Nav from "@/components/Nav/Nav";
import Centerblock from "@/components/Centerblock/Centerblock";
import Sidebar from "@/components/Sidebar/Sidebar";
import BarPlayer from "@/components/BarPlayer/Barplayer";
import { useState } from "react";
import { trackType } from "@/types";


export default function Home() {

  const [track, setTrack] = useState<trackType | null>(null)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <Centerblock setTrack={setTrack}/>
          <Sidebar />
        </main>
        {track &&(<BarPlayer track={track}/>)}
        <footer className={styles.footer} />
      </div>
    </div>

  );
}
