import BarPlayer from "@/components/BarPlayer/Barplayer"
import Centerblock from "@/components/Centerblock/Centerblock"
import Nav from "@/components/Nav/Nav"
import Sidebar from "@/components/Sidebar/Sidebar"
import styles from "./layout.module.css";

export default function TracksLayout({ children }:
    Readonly<{ children: React.ReactNode; }>) {
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

    )
}