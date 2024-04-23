import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import classNames from "classnames"

export default function SignUpPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.containerSignup}>
                <div className={styles.modalBlock}>
                    <form className={styles.modalFormLogin}>
                        <Link href="/signup">
                            <div className={styles.modalLogo}>
                                <Image width={140} height={21}  src="/img/logo_modal.png" alt="logo" />
                            </div>
                        </Link>
                        <input
                            className={classNames(styles.modalInput, styles.login)}
                            type="text"
                            name="login"
                            placeholder="Логин"
                        />
                        <input
                            className={styles.modalInput}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                        />
                        <input
                            className={styles.modalInput}
                            type="password"
                            name="password"
                            placeholder="Повторите пароль"
                        />
                        <button className={styles.modalBtnSignupEnt}>
                            <Link href="/">Зарегистрироваться</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
