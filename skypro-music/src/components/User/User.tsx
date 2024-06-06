'use client'
import { useAppSelector } from "../hooks";
import styles from "./User.module.css";


export default function User() {

    const user = useAppSelector((state) => state.user.user);
    if (!user.id) return null
    return (
        <div className={styles.sidebarPersonal}>
            <p className={styles.sidebarPersonalname}>{user.username}</p>
            <div className={styles.sidebarIcon}>
                <svg>
                    <use xlinkHref="/img/icon/sprite.svg#logout" />
                </svg>
            </div>
        </div>
    )

}