import { memo } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css"
import Image from "next/image";

function Sidebar() {
  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalname}>Sergey.Ivanov</p>
        <div className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/1">
              <Image
                width={250}
                height={150}
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="Плейлист дня"
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/2">
              <Image
                width={250}
                height={150}
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="100 танцевальных хитов"
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/3">
              <Image
                width={250}
                height={150}
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="Инди-заряд"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Sidebar)