'use client'
import Image from "next/image"
import styles from "./Nav.module.css"
import { useState } from "react"
import Link from "next/link"


export default function Nav() {
  const [isOpened, setIsOpend] = useState<boolean>(false)


  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          alt="логотип skypro-music"
          width={113}
          height={17}
          className={styles.logoImage}
          src="/img/logo.png"
        />
      </div>
      <div onClick={() => setIsOpend((prev) => !prev)} className={styles.navBurger}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpened && (<div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Главное
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Мой плейлист
              </a>
            </li>
            <li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
        )
      }
    </nav>
  )
}