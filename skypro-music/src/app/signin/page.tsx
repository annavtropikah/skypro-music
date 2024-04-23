import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import classNames from "classnames"


export default function SignInPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.containerEnter}>
                <div className={styles.modalBlock}>
                    <form className={styles.modalFormLogin} action="#">
                        <Link href="/signin">
                            <div className={styles.modalLogo}>
                                <Image width={140} height={21} src="/img/logo_modal.png" alt="logo" />
                            </div>
                        </Link>
                        <input
                            className={classNames(styles.modalInput, styles.login)}
                            type="text"
                            name="login"
                            placeholder="Почта"
                        />
                        <input
                            className={classNames(styles.modalInput, styles.password)}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                        />
                        <button className={styles.modalBtnEnter}>
                            <Link href="/">Войти</Link>
                        </button>
                        <button className={styles.modalBtnSignup}>
                            <Link href="/signup">Зарегистрироваться</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

