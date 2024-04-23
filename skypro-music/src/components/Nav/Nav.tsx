import Image from "next/image";
import styles from "./Nav.module.css";

export default function Nav(){
    return(
        <nav className={styles.mainNav}>
            <div className={styles.navLogo}>
              <Image alt="логотип skypro-music" width={113} height={17} className={styles.logoImage} src="/img/logo.png" />
            </div>
            <div className={styles.navBurger}>
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </div>
            <div className={styles.navMenu}>
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
                  <a href="../signin.html" className={styles.menuLink}>
                    Войти
                  </a>
                </li>
              </ul>
            </div>
          </nav>
    )
}