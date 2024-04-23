
import styles from "./page.module.css";

import Nav from "@/components/Nav/Nav";
import Centerblock from "@/components/Centerblock/Centerblock";
import Sidebar from "@/components/Sidebar/Sidebar";
import BarPlayer from "@/components/BarPlayer/Barplayer";


export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav/>
          <Centerblock/>
          <Sidebar/>
        </main>



        <BarPlayer/>



        <footer className="footer" />
      </div>
    </div>

  );
}
